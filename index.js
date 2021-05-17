const colors = require("colors");
const fs = require("fs");

let cursos = [
  {
    Id: 1,
    Curso: "Arte",
    Duracion: "35 horas",
    Costo: 140000,
  },
  {
    Id: 2,
    Curso: "Arquitectura",
    Duracion: "50 horas",
    Costo: 104000,
  },
  {
    Id: 3,
    Curso: "Dibujo",
    Duracion: "80 horas",
    Costo: 134000,
  },
];

function imprimir(post) {
  console.log(
    "El curso " +
      cursos[post].Curso.cyan +
      " con ID: " +
      cursos[post].Id +
      " tiene una duración de " +
      cursos[post].Duracion +
      " Con un costo de " +
      cursos[post].Costo
  );
}

const listar = () => {
  for (let i = 0; i < cursos.length; i++) {
    setTimeout(() => {
      imprimir(i);
    }, 2000 * i);
  }
};

const inscribir = (argv) => {
  const curso = cursos.findIndex((curso) => curso.Id === argv.d);
  if (curso === -1) {
    console.log("el curso no esta".red);
  } else {
    const Archivo = (nombre, cedula, Id) => {
      const texto =
        "El nombre del ingresado es: " +
        nombre +
        " con cedula : " +
        cedula +
        " En el curso: " +
        Id;
      fs.writeFile("Ingresado.txt", texto, (err) => {
        if (err) console.log("Un error".red);
        else console.log("Se creo".green);
        console.log(texto);
      });
    };
    imprimir(curso);
    Archivo(argv.n, argv.c, argv.d);
  }
};
const datos = {
  nombre: {
    demand: true,
    alias: "n",
  },
  cedula: {
    demand: true,
    alias: "c",
  },
  Id: {
    demand: true,
    alias: "d",
  },
};
const argv = require("yargs")
  .command("inscribir", "Realizar inscripción", datos, inscribir)
  .command("listar", "Muestra los curso", {}, listar)
  .demandCommand().argv;
