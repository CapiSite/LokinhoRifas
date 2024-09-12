import textRepository from "../../repositories/text-repository";
import transactionRepository from "../../repositories/transaction-repository";
import userRepository from "../../repositories/user-repository";

export async function getTransactions(userId:number) {
    const user = userRepository.findById(userId)
    if(!user){
        throw new Error("User not found")
    }
    return transactionRepository.getTransactionById(userId)
}

const transactionService = {
    getTransactions,
  };

export default transactionService