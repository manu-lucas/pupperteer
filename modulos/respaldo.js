import puppeteer from "puppeteer";
import fs from "fs/promises"


async function navigateWebPage(cuit, contraseña) {
  const browser = await puppeteer.launch({
    slowMo: 200,
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://zeusr.sii.cl//AUT2000/InicioAutenticacion/IngresoRutClave.html?https://misiir.sii.cl/cgi_misii/siihome.cgi");

  await page.focus('input[name="rutcntr"]');
  await page.keyboard.type(cuit)

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.focus('input[name="clave"]');
  await page.keyboard.type(contraseña)
  await page.keyboard.press("Enter")
  await new Promise((resolve) => setTimeout(resolve, 3000));
  /* -------------------------  */

  await page.click('button[class="close"]')

  const result = await page.evaluate(() => {
    const arraylist = document.querySelectorAll("p.info2");
    const data = [...arraylist]

    let info = []
    for (let i = 0; i <= 4; i++) {
      info.push(data[i].innerText)

    }
    return info
  })
  console.log(result)
  /* ------------------------------------------  */
  await page.click('a[id="menu_datos_contribuyente"]')
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await page.click('a[href="#collapse3Cntrb"]')


  const divResult = await page.evaluate(() => {
    const divPrincipal = document.querySelector("#represVig");
    const children = divPrincipal.childNodes;
    const anidado = children[7]
    return (anidado.innerText)
  })
  console.log(divResult)

  await new Promise((resolve) => setTimeout(resolve, 3000));

  await page.click('a[href="#collapse6Cntrb"]')
  const divResult1 = await page.evaluate(() => {
    const divPrincipal = document.querySelector("#divActEcos");
    const children = divPrincipal.children;
    const anidado = children[4]
    console.log(anidado)
    return (anidado.innerText)
  })
  console.log(divResult1)
  await page.click('span[id="cerrar-sesion"]')


  await browser.close();

}


const cuit = "77471417-0"
const contraseña = "Fva77471"
navigateWebPage(cuit, contraseña);

/*-----------------------------------------------------*/
/*

76532205-7	ranasfeas
77471417-0	Fva77471
27951623-0	Pompom1992
77826162-6	Peluche1299
77464503-9	nortef77
4028664-0	3642252718
76950556-3	apsc00aa00
77224213-1	Flex1roc
77799922-2	Girasol4951
19166987-8	Clickgr95
13719217-9	pablo2023
77854447-4	JoGo2023
77381989-0	Bb30986354
15435821-8	samu1543
77270256-6	Integral14
76898783-1	77002611
13212869-3	31
77434235-4	creaelqui3
26109142-9	Sii559259
17256917-k	lokmania88
76586594-8	Koun2588
77481085-4	Santiago20
10420954-8	2593mona
77851846-5	77851846sp
77419852-0	ZuniSan306
77088453-5	Paulo258
77202316-2	Katalina31
77549688-6	Beuffe688
77169259-1	dyukin123
15372596-9	Leyla0801
76250434-0	S.P.Y.S.L.
17178977-K	danzagiz21
12474982-4	Maripoza73
76964693-0	balgus1995
76563462-8	´01042015
77282796-2	reaa2614
14278588-9	Egipto1782
14333765-0	azocar1977
76980175-8	CATRIRO176
77627392-9	chileno12
77630684-3	miasesor23
16219055-5	cata2607
77020913-7	cata2607
77494847-3	xj123456789
77363654-0	Vmb7060679
65216086-7	Anellys18
77309295-8	Jcyf2022
76896501-3	73973
77659919-0	Nino2428
77514162k	Mifm1503
77026943-1	Andrea2018
77859082-4	Proyecto1
77741391-0	Asfipy3910
*/