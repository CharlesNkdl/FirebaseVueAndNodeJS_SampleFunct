/* This is a script using NodeJS, with the tools from Firebase-admin (npm install firebase-admin)
With this i have the right to check what is in the storage with the "fs" from node
I need to import my credentials, which is in the setup from firebase
I then generate a json file, which will be filled with the informations from the cloud storage, to minimize the queries on it
It'll be easier to handle on the front and also gain some time */

const admin = require("firebase-admin");
const { ref } = require("firebase/storage");
const fs = require("fs");

// Initialisez l'application Firebase
const ServiceAccount = require("../keyAdmin.json");
admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  storageBucket: "vueimagedb.appspot.com", // Remplacez par le nom de votre bucket Firebase Storage
});
fs.writeFile("storage.json", "", { flag: 'w' }, (error) => {
    if (error) {
      console.error("Erreur lors de l'écriture du fichier JSON :", error);
    } else {
      console.log("Fichier JSON réinitialisé avec succès !");
    }
  });

const storage = admin.storage();
const bucket = storage.bucket();
async function generateJsonFile() {
	try {
	const [files] = await bucket.getFiles();
	const fileData = [];

	  for (const file of files) {
		const name = file.name;

		if (name.endsWith(".txt")) {
		  const fileRef = bucket.file(name);
		  const [data] = await fileRef.download();
		  const textContent = data.toString();

		  fileData.push({
			name: name,
			typeof: "text",
			content: textContent
		  });
		}
		else if (name.endsWith("/")) {
			fileData.push({
              name: name,
              typeof: "folder"
            });
		}
		else if (name.endsWith(".webp")){
		  const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${name}`;

		  fileData.push({
			name: name,
			typeof: "image",
			content: downloadUrl
		  });
		}
	}


	  const jsonData = JSON.stringify(fileData);

	  fs.writeFile("storage.json", jsonData , { flag :'a' }, (error) => {
		if (error) {
		  console.error("Erreur lors de l'écriture du fichier JSON :", error);
		} else {
		  console.log("Fichier JSON généré avec succès !");
		}
	  });
	}catch (error) {
	  console.error("Erreur lors de la récupération des fichiers :", error);
  }
}

  generateJsonFile();
