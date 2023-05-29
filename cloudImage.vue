<template>
	<img :src="url" alt="" />
	<!-------
		This is a simple Vue fonction, the use is to get a img stocked in firebase storage
		And Then display it on the page.
		It needs as a parameter the path to the image file in firebase storage.
		No need to get the whole path, as we got it with the ref() function from firebase storage.
		It gives us back the download image url.
	------->
</template>
<script>
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

    export default {
		props: {
			path: String,
		},
		data: () => {
				return {
						url: 'https://placekitten.com/200/140',
					};
				},
		mounted() {
			getDownloadURL(ref(storage, this.path)).then(
				(download_url) => (this.url = download_url)
			)
			}
		};
</script>
