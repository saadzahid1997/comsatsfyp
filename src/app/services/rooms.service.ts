import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class roomService {
    roomId: any;

    constructor(public afs: AngularFirestore)
    {

    }
    getRoomDetails()
    {
        return this.afs.collection('room-details').snapshotChanges().pipe(map(res => {
            return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
        }))
    }
    setRoomData(roomId)
    {
        this.roomId = roomId;
    }   
    getRoomData()
    {
        return this.roomId;
    }       
}