// services/errors.js

export function duplicatedSkinNameError() {
    return new Error("Nome de skin já existe");
}
