export enum AwsError {
    CODE_IS_MISSING = "CodeMismatchException",
    CODE_IS_EXPIRED ="ExpiredCodeException",
    EMAIL_ALREADY_EXIST = "UsernameExistsException",
    USER_NOT_FOUND = "UserNotFoundException",
    USER_NOT_CONFIRMED = "UserNotConfirmedException",
}