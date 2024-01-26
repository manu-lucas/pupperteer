import puppeteer from "puppeteer";


const datosUsuario = {};


export default async function ingreso(cuit,contraseña) {
  const browser = await puppeteer.launch({
    // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    // slowMo: 70,
    // headless: false,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://zeusr.sii.cl//AUT2000/InicioAutenticacion/IngresoRutClave.html?https://misiir.sii.cl/cgi_misii/siihome.cgi"
  );
  await page.type('input[name="rutcntr"]', cuit);
  //   await page.focus('input[name="rutcntr"]');
  //   await page.keyboard.type(cuit);
  await page.type('input[name="clave"]', contraseña);
  //   await page.focus();
  //   await page.keyboard.type(contraseña);
  await page.keyboard.press("Enter");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
  setTimeout(async () => {
    await page.keyboard.press("Enter");
  }, 600);
  //   await page.keyboard.press("Enter");

  try {
    const result = await page.evaluate(() => {
      const modal = document.querySelector('div[class="modal fade in"]');
      if (modal !== null) {
        return true;
      } else {
        return false;
      }
    });
    if (result === true) {
      await page.click('button[class="close"]');
    }
  } catch (error) {
    console.log("no tiene modal o algun error alli");
  }
  

  
  setTimeout(() => {
    infoUsuario(page, cuit);
  }, 100);

  setTimeout(() => {
    representateLegales(page, browser);
  }, 500);

  setTimeout(() => {
    console.log("objeto", datosUsuario)
    return datosUsuario

  }, 10000);

}
/*  -----------------------------  */
async function infoUsuario(page, cuit) {
  try {
    const result = await page.evaluate(() => {
      const arraylist = document.querySelectorAll("p.info2");
      const data = [...arraylist];

      let info = [];
      for (let i = 0; i <= 4; i++) {
        info.push(data[i].innerText);
      }
      return info;
    });
    // console.log("INFORMACION DE USUARIO:", result);
    datosUsuario.usuario= result;
    return result
  } catch (error) {
    console.log("No se pudo ingresar a la pagina", cuit);
  }
}
/* ------------------------------------------------------------------- */
async function representateLegales(page, browser) {
  try {
    await page.click('a[id="menu_datos_contribuyente"]');
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const result = await page.evaluate(() => {
        const modal = document.querySelector('div[class="modal fade in"]');
        if (modal !== null) {
          return true;
        } else {
          return false;
        }
      });
      if (result === true) {
        await page.click('button[class="close"]');
      }
    } catch (error) {
      console.log("error en representante legal-modal check");
    }
    await page.click('a[href="#collapse3Cntrb"]');
    const divResult = await page.evaluate(() => {
      const divPrincipal = document.querySelector("#represVig");
      const children = divPrincipal.childNodes;
      const anidado = children[7];
      return anidado.innerText;
    });
    const datos = divResult.split("\n");
    // console.log("REPRESENTANTELEGAL: ", datos);
    datosUsuario.legales= datos

    await page.click('a[href="#collapse3Cntrb"]');
  } catch (error) {
    console.log("No tiene representante legal");
  }
/* ------------------------------------------------------------- */

  try {
    // await page.click('a[id="menu_datos_contribuyente"]')
    await new Promise((resolve) => setTimeout(resolve, 500));
    await page.click('a[href="#collapse6Cntrb"]');

    const divResult1 = await page.evaluate(() => {
      const divPrincipal = document.querySelector("#divActEcos");
      const children = divPrincipal.children;
      const anidado = children[4];
      return anidado.innerText;
    });
    const dataAct = divResult1.split("economicas");
    // console.log("ACTIVIDAD ECONOMICA", dataAct[0].split("\t"));
    datosUsuario.actividades = dataAct[0].split("\t")

    await page.click('span[id="cerrar-sesion"]');
    await browser.close();
  } catch (error) {
    console.log("No se encontro actividad economica");
    await browser.close();
  }
  //   await browser.close();
}