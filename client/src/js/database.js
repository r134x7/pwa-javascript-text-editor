import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (content) => {
  console.log("PUT to database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", 'readwrite'); // need readwrite authorisation
  const store = tx.objectStore("jate");// will cache responses of these statuses to a max of 30 days
  const request = store.put({ id: 1, value: content }) // will PUT to id: 1 only.
  const result = await request;
  console.log("Data saved to the database", result);
};


// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  console.log("GET all from database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", 'readonly'); // need readonly authorisation
  const store = tx.objectStore("jate");
  const request = store.getAll(); // I used get all because the TODO above made it sound like I needed .getAll() so I used that instead of get()
  const result = await request;
  console.log("result.value", result); // getAll() puts all the objects into an array
  return (result.length === 0) ? null : result["0"]["value"]; // if the array is empty return null, otherwise result 0 index of array, return value from the object.
  // because of using .getAll I used this to retrieve the string from the object. I assume if I used get() I wouldn't be having to do that but I already got this to work regardless
};


initdb();
