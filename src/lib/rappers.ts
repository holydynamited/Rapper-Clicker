import fakemink from "../assets/rappers/fakemink.jpg"
import yeat from "../assets/rappers/yeat.jpg"
import nine from "../assets/rappers/ninevicious.png"
import bleood from "../assets/rappers/bleood.jpg"
import carti from "../assets/rappers/carti.jpg"

type rarity = 'common'|'rare'|'epic'|'arcane'

type rapperStatus = "locked"|"unlocked"|"active"


export type rapper ={

    id:string,
    name:string,
    about:string,
    rapperImg:string,
    clickPower:number,
    leanPerSecond:number,
   
    rapperRarity:rarity

    
}



export const RAPPERS:rapper[] = [
    {
        id:"yeat",
        name:"Yeat",
        about:"I DON'T LIKE HIM NOW!!! MINION!",
        rapperImg:yeat,
        clickPower:1,
        leanPerSecond:0,
        rapperRarity:"common"
    },
    {
        id:"ninevicious",
        name:"Nine Vicious",
        about:"What I'm 'posed to do when these racks blue?",
        rapperImg:nine,
        clickPower:3,
        leanPerSecond:1,
        rapperRarity:"rare"
        
    },
    {
        id:"fakemink",
        name:"fakemink",
        about:"My Sprite like Easter Pink",
        rapperImg:fakemink,
        clickPower:3,
        leanPerSecond:1,
        rapperRarity:"rare"
    },
    {
        id:"bleood",
        name:"bleood",
        about:"King RASCAL",
        rapperImg:bleood,
        clickPower:25,
        leanPerSecond:10,
        rapperRarity:"epic"
    },
    {
        id:"carti",
        name:"Playboi Carti",
        about:"KING VAMP YVL",
        rapperImg:carti,
        clickPower:100,
        leanPerSecond:35,
        rapperRarity:"epic"
    }
]