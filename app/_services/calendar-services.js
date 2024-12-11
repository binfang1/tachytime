import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, doc } from "firebase/firestore";

export async function addItem(userId, item, date) {
    try {
        const docRef = await addDoc(collection(db, "users", userId, date), {"name": item});

        return docRef.id;
    } catch (e) {
        console.error("Error in addItem:", e);
    }
}

export async function getItems(userId, date) {
    try {
        const q = query(
            collection(db, "users", userId, date)
        )
        const querySnapshot = await getDocs(q)

        const items = [];

        querySnapshot.forEach((doc) => {
            items.push([doc.data().name])
        });
        
        console.log("Items from getItems:");
        console.log(items);

        return items;

    } catch (e) {
        console.error("Error in getItems: ", e);
    }
}

export async function deleteItem(userId, date, name) {
    try {
        const q = query(
            collection(db, "users", userId, date)
        )
        const querySnapshot = await getDocs(q)

        var found_doc_id;

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id}: ${doc.data().name} comparing with ${name}`);
            if(doc.data().name.localeCompare(name) == 0) {
                console.log(`Found ${doc.id}`);
                found_doc_id = doc.id;
            }
        });

        if(found_doc_id != null) {
            await deleteDoc(doc(db, "users", userId, date, found_doc_id));
        }

    } catch (e) {
        console.error("Error in deleteItem: ", e);
    }
}
