
type rapperStatus = "locked"|"unlocked"|"active"


export type rapper ={

    id:string,
    name:string,
    clickPower:number,
    leanPerSecond:number,
    status:rapperStatus;

    
}