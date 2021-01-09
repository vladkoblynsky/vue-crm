import firebase from "firebase/app";

interface LoginPayloadInterface {
  email: string;
  password: string;
}
interface RegisterPayloadInterface {
  email: string;
  password: string;
  firstName: string;
  bill: number;
}

export default {
  actions: {
    async login(
      { dispatch, commit }: any,
      { email, password }: LoginPayloadInterface
    ) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e.message);
        throw e;
      }
    },
    async register(
      { dispatch, commit }: any,
      { email, password, firstName, bill }: RegisterPayloadInterface
    ) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill,
            firstName
          });
      } catch (e) {
        commit("setError", e.message);
        throw e;
      }
    },
    getUid(): string | undefined {
      const user = firebase.auth().currentUser;
      return user?.uid;
    },
    async logout() {
      await firebase.auth().signOut();
    }
  }
};
