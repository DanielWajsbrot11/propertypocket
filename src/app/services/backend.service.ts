import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";

import { Timestamp } from 'firebase/firestore';

// The following site shows authentication and access to current user. Current user gets used a lot in our code.
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc

@Injectable({
  providedIn: "root",
})
export class BackendService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // insert bookmark on zpid and user

  async makeBookmark(zpid: string): Promise<void> {
    const user = await this.afAuth.currentUser;
  
    if (user) {
      const userID = user.uid; 
  
      try {
        await this.firestore.collection('Bookmark').add({
          zpid: zpid,         
          userID: userID,     
          time: new Date()    
        });
  
      } catch (error) {
        console.error('Error adding bookmark: ', error);
        throw error;
      }
    } else {
      console.error('User not authenticated');
      throw new Error('User not authenticated');
    }
  }
  
  // insert comment on zpid and user

  async makeComment(zpid: string, comment: string): Promise<void> {
    const user = await this.afAuth.currentUser;
  
    if (user) {
      const userID = user.uid; 
  
      try {
        await this.firestore.collection('Comment').add({
          zpid: zpid,         
          userID: userID,
          comment: comment,     
          time: new Date(),
          name: user.displayName
        });

        console.log(user.displayName);
      } catch (error) {
        console.error('Error adding Comment: ', error);
        throw error;
      }
    } else {
      console.error('User not authenticated');
      throw new Error('User not authenticated');
    }
  }

  // insert like on zpid and user

  async makeLike(zpid: string): Promise<void> {
    const user = await this.afAuth.currentUser;
  
    if (user) {
      const userID = user.uid; 
  
      try {
        await this.firestore.collection('Like').add({
          zpid: zpid,         
          userID: userID,     
          time: new Date()    
        });
  
      } catch (error) {
        console.error('Error adding like: ', error);
        throw error;
      }
    } else {
      console.error('User not authenticated');
      throw new Error('User not authenticated');
    }
  }

  // remove bookmark associated with user/zpid

  async deleteBookmark(zpid: string): Promise<void> {
    const user = await this.afAuth.currentUser;
  
    if (user) {
      const userID = user.uid;
  
      const bookmarksRef = this.firestore.collection('Bookmark');
  
      const querySnapshot = await bookmarksRef.ref
        .where('userID', '==', userID)
        .where('zpid', '==', zpid)
        .get();
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await doc.ref.delete();
          console.log(`Bookmark for ZPID: ${zpid} has been deleted.`);
        });
      } else {
        console.log('No bookmark found to delete.');
      }
    } else {
      console.error('User not authenticated');
      throw new Error('User not authenticated');
    }
  }

  // remove like associated with user/zpid

  async deleteLike(zpid: string): Promise<void> {
    const user = await this.afAuth.currentUser;
  
    if (user) {
      const userID = user.uid;
  
      const likesRef = this.firestore.collection('Like');
  
      const querySnapshot = await likesRef.ref
        .where('userID', '==', userID)
        .where('zpid', '==', zpid)
        .get();
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await doc.ref.delete();
          console.log(`Like for ZPID: ${zpid} has been deleted.`);
        });
      } else {
        console.log('No bookmark found to delete.');
      }
    } else {
      throw new Error('User not authenticated');
    }
  }

  // all bookmarks from user

  async getBookmarks(){
    const user = await this.afAuth.currentUser;
    if (user) {
      const userID = user.uid;
      const bookmarksRef = this.firestore.collection('Bookmark');
      const bookmarksSnapshot = await bookmarksRef.ref.where('userID', '==', userID).get();

      let zpids: string[] = [];

      if (bookmarksSnapshot.empty) {
        return [];
      } else {
        const bookmarks = bookmarksSnapshot.docs.map(doc => {
          const data = doc.data() as { zpid: string; userID: string; time: Timestamp;};
          return {
            zpid: data.zpid,
            time: data.time
          };
        });

        bookmarks.sort((a, b) => b.time.toMillis() - a.time.toMillis());

        return bookmarks;
      }
    } else {
      return;
    }
  }

  // all likes from user

  async getLikes(){
    const user = await this.afAuth.currentUser;
    if (user) {
      const userID = user.uid;
      const likesRef = this.firestore.collection('Like');
      const likesSnapshot = await likesRef.ref.where('userID', '==', userID).get();

      let zpids: string[] = [];

      if (likesSnapshot.empty) {
        return [];
      } else {
        const likes = likesSnapshot.docs.map(doc => {
          const data = doc.data() as { zpid: string; userID: string; time: Timestamp;};
          return {
            zpid: data.zpid,
            time: data.time
          };
        });

        likes.sort((a, b) => b.time.toMillis() - a.time.toMillis());

        return likes;
      }
    } else {
      return;
    }
  }

  // Number of likes for post (zpid)

  async getNumLikes(zpid: string){
    const user = await this.afAuth.currentUser;

    const likesRef = this.firestore.collection('Like');
    const likesSnapshot = await likesRef.ref.where('zpid', '==', zpid).get();

    let zpids: string[] = [];

    if (likesSnapshot.empty) {
      return 0;
    } else {
      // Chat-GPT helped with understanding the following logic and for appendint to and getting unique userIDs in an array.
      const likes = likesSnapshot.docs.map(doc => {
        const data = doc.data() as { zpid: string; userID: string; time: Timestamp;};
        return {
          userID: data.userID,
        };
      });

      let likesArr = likes.map(like => like.userID);
      
      const likesSet = new Set(likesArr);
      console.log(likesSet);
      return likesSet.size;
    }
  }

  // get all comments associated with a ZPID
  // We had an issue with security rules not allowing for access to comments table. Chat-GPT helped solve this bug.

  async getZPIDComments(zpid: string){
    const commentsRef = this.firestore.collection('Comment');
    console.log(commentsRef.ref);
    const commentsSnapshot = await commentsRef.ref
    .where('zpid', '==', zpid)
    .get();

    let zpids: string[] = [];

    if (commentsSnapshot.empty) {
      return [];
    } else {
      const comments = commentsSnapshot.docs.map(doc => {
        const data = doc.data() as { zpid: string; userID: string; comment: string; time: Timestamp; name: string};

        return {
          userID: data.userID,
          zpid: data.zpid,
          comment: data.comment,
          time: data.time,
          name: data.name
        };
      });

      comments.sort((a, b) => b.time.toMillis() - a.time.toMillis());

      return comments;
    }
  }
}
