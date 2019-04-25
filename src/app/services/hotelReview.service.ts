
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { firestore } from 'firebase';

@Injectable()
export class hotelReviewService {


    reviewCollection: AngularFirestoreCollection<any>;
    review: Observable<any>;
    constructor(public afs: AngularFirestore) 
    {
        console.log("Review service instantiated...");
    }
    
    getReviewDetails() 
    {
            return this.afs.collection('hotel-Reviews').snapshotChanges().pipe(map(res => {
            return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
        }))
    }

    addReviewToHotel(reviewId, hotelId) 
    {
        //console.log(`hoteldId: ${hotelId}  |tripId: ${tripId}`);
        return this.afs.collection('hotel').doc(hotelId).set({ 'hotel-Reviews': firestore.DocumentReference.bind(reviewId) }, { merge: true });
    }
}   