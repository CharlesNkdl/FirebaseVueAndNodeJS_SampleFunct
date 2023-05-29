<template>
	<p>{{ textContent }}</p>
		<!-------
		This is a Vue fonction, the use is to get a txt file stocked in firebase storage
		And Then display the contents of the txt file.
		It was very hard to get it to work, as there was a lot of CORS errors. Even when changing the rule in the storage
		It had to do something which is in another file of the git repository
		I used Axios for a GET request to get the file from firebase storage.
		Then displayed the data fron the file.
		It needs as a parameter the path to the image file in firebase storage.
		No need to get the whole path, as we got it with the ref() function from firebase storage.
	------->
</template>

<script>
  import { storage } from "../firebase";
  import { ref, getDownloadURL } from "firebase/storage";
  import axios from "axios";

  export default {
	props: {
	path: String,
	},
	data() {
	return {
		textContent: "",
	};
	},
	mounted() {
  getDownloadURL(ref(storage, this.path))
    .then((downloadUrl) => {
      axios.get(downloadUrl)
        .then((response) => {
          this.textContent = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du fichier :", error);
        });
    })
    .catch((error) => {
      console.error("Erreur lors du téléchargement du fichier :", error);
    });
}}

</script>




