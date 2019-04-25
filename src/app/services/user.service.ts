import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class UserService {
    userName: any;

    constructor(public afs: AngularFirestore)
    {

    }
getHotels()
     {
        return this.afs.collection('users').snapshotChanges().pipe(map(res => {
        return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
        }))

    }
 setUserData(userName)
    {
        this.userName = userName;
    }   
getUserData()
    {
        return this.userName
    }       
}