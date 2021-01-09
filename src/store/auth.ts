import firebase from "firebase/app";

interface LoginPayloadInterface {
  email: string;
  password: string;
}

export default {
  actions: {
    async login(
      { dispatch, commit }: any,
      { email, password }: LoginPayloadInterface
    ) {
      console.log(dispatch, commit);

      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log(res);
      } catch (e) {
        console.error(e);

        throw e;
      }
    },
    async logout() {
      await firebase.auth().signOut();
    }
  }
};
