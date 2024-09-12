import textRepository from "../../repositories/text-repository";

export async function postText(text:string) {
    return textRepository.postText(text);
}

export async function getText() {
    return textRepository.getText();
}

const textService = {
    getText,
    postText,
  };

export default textService