import { CreateRaffleParams } from "../../utils/types";
import rouletteRepository from "../../repositories/roulette-repository";
import skinRepository from "../../repositories/skin-repository";

async function getParticipants()  {
  return await rouletteRepository.getActiveRaffleParticipants();
}

async function getParticipantsByRaffleId(id:number, page:number)  {
  const pageSize = 20
  return await rouletteRepository.getParticipantsByRaffleId(id, page, pageSize);
}

async function getParticipantsByRaffleName(id:number, name:string,page:number)  {
  const pageSize = 20

  if (name.length < 3) {
    throw new Error('O nome deve ter pelo menos 3 caracteres.');
}
  return await rouletteRepository.getParticipantsByRaffleName(id, name, page, pageSize);
}

const rouletteService = {
  getParticipants,
  getParticipantsByRaffleId,
  getParticipantsByRaffleName
};

export default rouletteService;
