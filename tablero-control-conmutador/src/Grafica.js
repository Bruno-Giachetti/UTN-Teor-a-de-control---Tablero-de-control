import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

//Variables globales
let salida = 0;                 //salida del sistema
let indexRedActual = 0;         //red actualmente elegida
let senalErrorAnterior = 0;     //señal de error del loop anterior

const GraficaFuncionPartida = (valuesFormik) => {
    const [chartData, setChartData] = useState({
        labels: [...Array(101).keys()].map(x => x * 0.1), // etiquetas de 0 a 10 con pasos de 0.1
        datasets: [
            {
                label: 'f(x)',
                data: [],
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
                stepped: 'before', // Hacer la línea escalonada
                pointRadius: 0, // Hide points
            },
        ],
    });
    const [chartOptions, setChartOptions] = useState({
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gráfica de la respuesta del sistema',
            },
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Milisegundos',
                },
                min: 0,
                max: 10,
                ticks: {
                    callback: function(value) {
                        return Number.isInteger(value) ? value : null; // Show only integer values
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Mbps',
                },
                min: 0,
                max: 1500,
                ticks: {
                    stepSize: 100,
                },
            },
        },
    });

    React.useEffect(() => {

        if (valuesFormik?.valuesInput) {
        setChartData({
            labels: [...Array(101).keys()].map(x => x * 0.1), // etiquetas de 0 a 10 con pasos de 0.1
            datasets: [
                {
                    label: 'f(t)',
                    data: [],
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 2,
                    fill: false,
                    stepped: 'before', // Hacer la línea escalonada
                    pointRadius: 0, // Hide points
                },
            ],
        })
        calcular(valuesFormik.valuesInput.referencia, valuesFormik.valuesInput.perturbacion, valuesFormik.valuesInput.red1, valuesFormik.valuesInput.red2, valuesFormik.valuesInput.red3);
    }

    }, [valuesFormik]);


    const elegirOtraRed = (indexRedActual, abRedes, valorReferencia) => {
        let indexRedElegida = indexRedActual;
        let abRedActual = abRedes[indexRedActual];
        for (let i = 0; abRedActual < valorReferencia; i++) {
            abRedActual = abRedes[i];
            if (abRedActual >= valorReferencia)
                indexRedElegida = i;

        }
        return indexRedElegida;

    }

    const calcular = (referencia, perturbacion, red1, red2, red3) => {

                
        let valorReferencia = referencia;  //valor en Mbps ingresado por el tecnico
        let puntoSuma1 = 0;                //Punto suma del medidor y la referencia
        let puntoSuma2 = 0;                //Punto suma del controlador PD     
        let pertubacionLluvia = perturbacion; //perturbacion  por lluvia


        let kp = 1;                         //ganancia proporcional
        let kd = 1;                         //ganancia derivativa

        let controlProporcional = 0;  
        let controlDerivativo = 0;
        let abRedes = [red1, red2, red3];       //Ancho de banda de cada red 

        let valorMedicion = 0;                  //valor en Mbps medido por el router en la salida
        let difTiempo;
        let tiempo = 1;                         // es el tiempo loop actual, 
                                                //seteo valor en 1 para que empiece adelantado 1 milisegundo

        let tiempoViejo = 0;                    //es el tiempo del loop anterior


        for (let index = 0; index < 10; index++) {
            console.log(referencia, perturbacion, red1, red2, red3, indexRedActual, senalErrorAnterior)

            valorMedicion = salida;

            puntoSuma1 = valorReferencia - valorMedicion;            //senal e


            difTiempo = tiempo - tiempoViejo;


            controlProporcional = puntoSuma1 * kp;                                          //salida proporcional

            controlDerivativo = (puntoSuma1 - senalErrorAnterior) * kd / difTiempo;         //salida derivativa

            puntoSuma2 = controlProporcional + controlDerivativo;                           //salida del PD

            console.log(controlProporcional,controlDerivativo);
            if (puntoSuma2 > 0)                             //Accion de conmutar las redes, Menor a 0 significa VM > VR, que es lo que se busca
            {
                indexRedActual = elegirOtraRed(indexRedActual, abRedes, valorReferencia);
                //conmutarRed(indexRedActual);                          //Funcion que implementa el cambio de redes

            }



            senalErrorAnterior = puntoSuma1;
            generateData(tiempo, tiempoViejo, salida)
            salida = abRedes[indexRedActual] + pertubacionLluvia;     //Salida del sistema, luego del punto suma con la perturbacion por lluvia
            tiempo += 1;
            tiempoViejo += 1;
            console.log(salida);

        }


    }

    const generateData = (tiempo, tiempoViejo, salida) => {
        console.log(tiempo, tiempoViejo);
        let dataSalida = [];
        for (let x = 0; x <= 10; x+=0.1) {
            if (x >= tiempoViejo && x < tiempo) {
                dataSalida.push({ x, y: salida });
            }
        }
        debugger;
        setChartData(prevChartData => ({
            datasets: [{
              ...prevChartData.datasets[0],
              data: [...prevChartData.datasets[0].data, ...dataSalida],
            }],
          }));
        };

    return (
        <React.Fragment>
            <Line data={chartData} options={chartOptions} />
        </React.Fragment>)
};

export default GraficaFuncionPartida;