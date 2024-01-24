import puppeteer from "puppeteer";
import fs from "fs/promises"
import ingreso from "./ingreso.js"
async function navigateWebPage(cuit,contraseña) {
   await ingreso(cuit,contraseña)
  /* -------------------------  */
  // await page.click('button[class="close"]')
  // /* -----------------------------------------  */
  // 
  // await page.click('span[id="cerrar-sesion"]')
  // await browser.close();

}
const cuit = "777999222";
const contraseña = "Girasol4951";


const usuarios = [
  {rut: "76532205-7" , contraseña:"ranasfeas"},
{rut: "77471417-0" , contraseña:"Fva77471"}
// {rut: "27951623-0" , contraseña:"Pompom1992"},
// {rut: "77826162-6" , contraseña:"Peluche1299"} ,
// {rut: "77464503-9" , contraseña:"nortef77"},
// {rut: "4028664-0" , contraseña:"3642252718"},
// {rut: "76950556-3" , contraseña:"apsc00aa00"},
// {rut: "77224213-1" , contraseña:"Flex1roc"},
// {rut: "77799922-2" , contraseña:"Girasol4951"},

]
navigateWebPage(cuit,contraseña);