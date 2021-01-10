export interface SnackbarMessageInterface {
  msg: string;
  variant: "error" | "success" | "warn" | "info";
}

export interface MessageStateInterface {
  snackbarMsg: SnackbarMessageInterface | null;
}
