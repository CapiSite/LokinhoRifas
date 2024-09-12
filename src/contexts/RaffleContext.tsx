import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import style from '../pages/admin/admin.module.css'
import { RaffleInfoTable } from "utils/interfaces"

const RaffleContext = createContext({})

export const useRaffleContext = () => {
  return useContext(RaffleContext)
}


export const RaffleProvider = ({children} : {children: ReactNode}) =>{
  const [ raffle, setRaffle ] = useState<RaffleInfoTable[]>([])
  const [ unitValue, setUnitValue ] = useState<number>(0)
  const [ addedItemList, setAddedItemList ] = useState<[string, string, number][]>([])

  const numberOfParticipants = useRef<HTMLInputElement>(null)

  const formatarDataHoraAtual = () => {
    const agora = new Date(Date.now())

    const dia = String(agora.getDate()).padStart(2, '0')
    const mes = String(agora.getMonth() + 1).padStart(2, '0')
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, '0')
    const minutos = String(agora.getMinutes()).padStart(2, '0')

    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`
  }

  const formatarDataHoraAleatoria = () => {
    const agora = new Date();
    const umAnoAtras = new Date();
    umAnoAtras.setFullYear(agora.getFullYear() - 1);
  
    const randomTimestamp = agora.getTime() + Math.random() * (umAnoAtras.getTime() - agora.getTime());
    const dataAleatoria = new Date(randomTimestamp);
  
    const dia = String(dataAleatoria.getDate()).padStart(2, '0');
    const mes = String(dataAleatoria.getMonth() + 1).padStart(2, '0');
    const ano = dataAleatoria.getFullYear();
    const horas = String(dataAleatoria.getHours()).padStart(2, '0');
    const minutos = String(dataAleatoria.getMinutes()).padStart(2, '0');
  
    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`;
  }


  const csgoSkins = [
    "Redline",
    "Dragon Lore",
    "Howl",
    "Blaze",
    "Fade",
    "Kill Confirmed",
    "Doppler",
    "Hyper Beast",
    "Vulcan",
    "Asiimov",
    "Emerald Dragon",
    "Neon Rider",
    "Code Red",
    "Water Elemental",
    "Cortex",
    "Tiger Tooth",
    "Roll Cage",
    "Hyper Beast",
    "Fire Serpent",
    "Desolate Space",
    "Golden Koi",
    "Wasteland Rebel",
    "Orion",
    "Case Hardened",
    "Bloodsport",
    "Blood in the Water",
    "See Ya Later",
    "Case Hardened",
    "Golden Coil",
    "Graphite"
  ];

  // ? Legenda
  // const csgoSkinQuality = [
  //   '01 - Novo em Folha',
  //   '02 - Pouco Usado',
  //   '03 - Testado em Campo',
  //   '04 - Bem Usado',
  //   '05 - Desgastado pela Batalha',
  // ]
  // ? Legenda

  const csgoSkinQuality = [
    '01',
    '02',
    '03',
    '04',
    '05',
  ]

  const selectRandomWeapons = (randomNumber: number) => {
    const tempArray = []

    for(let i = 0; i < randomNumber; i++) {
      tempArray.push(`${csgoSkins[Math.floor(Math.random() * csgoSkins.length)]} (${csgoSkinQuality[Math.floor(Math.random() * csgoSkinQuality.length)]})`)
    }

    return tempArray
  }

  const sanitizeRaffleInput = (i: number, isFree: boolean, newItems?: boolean ): RaffleInfoTable => {
    if(newItems) {
      if(typeof isFree != 'boolean') isFree = false
      let tempTotalValue = 0
      let tempArray: string[] = []
      
      addedItemList.map(item => {
        tempTotalValue += item[2]
        tempArray.push(`${item[0]} (${item[1]})`)
      })

      let maxParticipantCount = 0
      
      if(numberOfParticipants.current) {
        maxParticipantCount = numberOfParticipants.current.value ? Number(numberOfParticipants.current.value) : 1
      }

      return {
        id: `${i}`,
        name: `SORTEIO #${i.toString().padStart(6, '0')}`,
        state: "Em espera",
        totalValue: tempTotalValue,
        unitValue: unitValue,
        skins: tempArray,
        participants: 1,
        maxParticipants: maxParticipantCount,
        isFree: isFree,
        ocurred: false,
        created: formatarDataHoraAtual(),
      }
    }

    const randomState = Math.floor(Math.random() * 10 + 1)
    const randomTotal = Number(Math.floor(Math.random() * 3000 + 1).toFixed(2))

    const randomMaxParticipantAmount = Math.floor(Math.random() * 100 + 1)

    const randomParticipant = randomState == 2 ? Number((randomMaxParticipantAmount / Math.floor(Math.random() * 50 + 1)).toFixed(0)) : randomState == 1 ? randomMaxParticipantAmount : 0

    const randomUnit = Number((randomTotal / randomMaxParticipantAmount).toFixed(2))

    const randomStateValue = randomState == 1 ? 'ativada' : randomState < 9 ? 'desativada' : 'em espera'

    return {
      id: `${i}`,
      name: `SORTEIO #${i.toString().padStart(6, '0')}`,
      state: randomStateValue as "Ativa" | "Inativa" | "Em espera",
      totalValue: randomTotal,
      unitValue: randomUnit,
      skins: selectRandomWeapons(Math.floor(Math.random() * 5 + 1)),
      participants: randomParticipant,
      maxParticipants: randomMaxParticipantAmount,
      isFree: randomState == 1 ? true : false,
      ocurred: randomState < 9 && formatarDataHoraAleatoria(),
      created: formatarDataHoraAleatoria(),
    }
  }

  useEffect(() => {
    const tempArray: RaffleInfoTable[] = []

    for(let i = 1; i < 88; i++) {
      tempArray.push(sanitizeRaffleInput(i, false))
    }

    setRaffle(tempArray)
  }, [])

  const submitNewRaffle = (isFree: boolean) => {
    if(typeof isFree === 'boolean') {
      // ? enviar para o back os dados da rifa para criar novas rifas
      // console.log(addedItemList, isFree)
      // console.log(addedItemList)
      // ? dados presentes serão: [nome: string, qualidade: string e valor: número (float)]
  
      setRaffle(oldArray => {return [...oldArray, sanitizeRaffleInput((raffle.length + 1), isFree, true)]})
      setAddedItemList([])
      
      if(numberOfParticipants.current) {
        numberOfParticipants.current.value = ''
      }
  
      // ? created: "18/04/2024, às 05:40"
      // ?id: "1"
      // ?maxParticipants: 29
      // ?name: "SORTEIO #000001"
      // ?ocurred: "14/03/2024, às 02:12"
      // ?participants: 1skins: (4) ['Cortex', 'Case Hardened', 'Cortex', 'Roll Cage']
      // ?state: "desativada"
      // ?totalValue: 39
      // ?unitValue: 1.34
    }
  }

  const addItem = (item: [string, string, number]) => {
    if(!item) return
    setAddedItemList(oldArray => [...(oldArray || []), item])
  }

  const removeItem = (item: [string, string, number]) => {
    if(!item) return
    setAddedItemList(oldArray => oldArray?.filter(itemArray => itemArray.join() !== item.join() ))
  }

  const formatReceipt = () => {
    if(addedItemList) {
      const max_width = 31
      return addedItemList.map(([item, quality, price], index) => {
        const itemPriceStr = `${item} (${quality}) ${Number(price).toFixed(2).toString().replace('.', ',')}`
        const numPeriods = max_width - itemPriceStr.length
        const periods = '.'.repeat(numPeriods)
        return (
          <p key={index} className={style.item} onClick={() => removeItem([item, quality, price])}>
            {item} ({quality}){periods}R$ {Number(price).toFixed(2).toString().replace('.', ',')}
          </p>
        )
      })
    }
  }

  return (
      <RaffleContext.Provider value={{submitNewRaffle, addItem, formatReceipt, addedItemList, unitValue, setUnitValue, raffle, setRaffle, numberOfParticipants}}>{children}</RaffleContext.Provider>
  )
}