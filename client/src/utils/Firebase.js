import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,  
    signInWithPopup,  
  } from "firebase/auth";
  import { getStorage, ref, uploadBytesResumable, getDownloadURL,deleteObject  } from "firebase/storage";
  import Swal from "sweetalert2";
  
  export const config = {
    apiKey: "AIzaSyAc0hsDsPBwy1XaHrWm-RitLGtNxP4qvyE",
    authDomain: "nerdoprj.firebaseapp.com",
    projectId: "nerdoprj",
    storageBucket: "nerdoprj.appspot.com",
    messagingSenderId: "620102430851",
    appId: "1:620102430851:web:07cc84577845ec9f75ebb6"
  };
  
  export async function firebaseRegistrarUsuario(email, password) {
    try {
      const auth = getAuth();
      const registrar = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return registrar.user;
    } catch (error) { 
      Swal.fire({
          icon: "error",          
          text: "The email is already in use",
          heightAuto: false,
        });
    }
  }
  
  export async function firebaseLogin(email, password) {
    try {
      const auth = getAuth();
      const login = await signInWithEmailAndPassword(auth, email, password);
      return login.user;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong user or password",
        heightAuto: false,
      });
    }
  }
  
  export async function firebaseLoginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const signIn = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(signIn);
      return signIn.user;
    } catch (error) {
      return Swal.fire({
        title: "Failed to login",
        icon: "warning",
        confirmButtonText: "OK",
        heightAuto: false,
        backdrop: `
                      rgba(0,0,123,0.4)
                      left top
                      no-repeat
                    `,
      });
    }
  }
  
  
  export async function firebaseCerrarSesion() {
    try {
      const auth = getAuth();
      const sesion = await auth.signOut();
      return sesion;
    } catch (error) {
      console.log(error);
    }
  }
  
 
  export  const uploadFiles = async(file,category) => {
    
    if (!file) return;
    const storage=getStorage()
    const sotrageRef = ref(storage, `${category}/${file.name}`);
    const uploadTask =  await uploadBytesResumable(sotrageRef, file);
    const retornar=await getDownloadURL(sotrageRef)
    return retornar
  };
  
  export function deleteStorage(URL){
   
  
    const storage = getStorage();
  
    // Create a reference to the file to delete
    const desertRef = ref(storage, URL);
  
    // Delete the file
    deleteObject(desertRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  }