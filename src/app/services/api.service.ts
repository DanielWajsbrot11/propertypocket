import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Timestamp } from 'firebase/firestore';

// chatGPT helped with design of functions/error handling
// logic was provided through firestore docs

@Injectable({
  providedIn: "root",
})
export class ApiService {
  userIdUrl = `${environment.backendUrl}/userid`;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  getUserId(): Observable<any> {
    return this.http.get(this.userIdUrl);
  }

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

  async deleteLike(zpid: string): Promise<void> {
    const user = await this.afAuth.currentUser;
  
    if (user) {
      const userID = user.uid;
  
      const bookmarksRef = this.firestore.collection('Like');
  
      const querySnapshot = await bookmarksRef.ref
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
      console.error('User not authenticated');
      throw new Error('User not authenticated');
    }
  }

  // works I think, end of array is oldest and front is newest. 
  async getBookmarks(){
    const user = await this.afAuth.currentUser;
    if (user) {
      const userID = user.uid;
      const bookmarksRef = this.firestore.collection('Bookmark');
      const bookmarksSnapshot = await bookmarksRef.ref.where('userID', '==', userID).get();

      let zpids: string[] = [];

      if (bookmarksSnapshot.empty) {
        console.log('No bookmarks found');
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

        console.log('Bookmarks sorted by timestamp:', bookmarks);
        return bookmarks;
      }
    } else {
      console.log('user needs to login')
      return;
    }
  }

  async getLikes(){
    const user = await this.afAuth.currentUser;
    if (user) {
      const userID = user.uid;
      const bookmarksRef = this.firestore.collection('Like');
      const bookmarksSnapshot = await bookmarksRef.ref.where('userID', '==', userID).get();

      let zpids: string[] = [];

      if (bookmarksSnapshot.empty) {
        console.log('No bookmarks found');
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

        console.log('Likes sorted by timestamp:', bookmarks);
        return bookmarks;
      }
    } else {
      console.log('user needs to login')
      return;
    }
  }
  
}

