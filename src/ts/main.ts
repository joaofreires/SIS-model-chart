import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js'
import SIS from './SIS'
import _ from 'lodash'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend)

let chart : Chart<'radar'>
const SISModel = new SIS(1, 0.25, BigInt(1000), BigInt(1))
const DEFAULT_PERIOD_END = 100
let timePeriod = DEFAULT_PERIOD_END
let newTimePeriod = timePeriod
const data : any = {
  x: _.range(100),
  I: SISModel.IPeriod(0, timePeriod),
  S: SISModel.SPeriod(0, timePeriod)
}

const config : any = {
  type: 'line',
  data: {
    labels: data.x,
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        id: 'I',
        label: 'Infectious',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data.I
        // (new SIS(0.8, 0.3, BigInt(1000), BigInt(1))).IPeriod(0, 10).map((val, idx) => { return { x: idx, y: val } })
      },
      {
        id: 'S',
        label: 'Susceptible',
        backgroundColor: 'rgb(132, 99, 255)',
        borderColor: 'rgb(132, 99, 255)',
        data: data.S
        // (new SIS(0.8, 0.3, BigInt(1000), BigInt(1))).IPeriod(0, 10).map((val, idx) => { return { x: idx, y: val } })
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'SIS Model'
      },
      legend: {
        labels: {
          usePointStyle: true,
          padding: 20
        },
        position: 'top',
        align: 'center'
      }
    },
    tooltips: {
      mode: 'point'
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Population'
        }
      }
    }
  }
}

function rebuildDatasets () {
  if (timePeriod !== newTimePeriod) {
    timePeriod = newTimePeriod
    chart.data.labels = _.range(timePeriod)
  }
  chart.data.datasets[0].data = SISModel.IPeriod(0, timePeriod)
  chart.data.datasets[1].data = SISModel.SPeriod(0, timePeriod)
  SISModel.IPeriod(0, DEFAULT_PERIOD_END)
  data.S = SISModel.SPeriod(0, DEFAULT_PERIOD_END)
  chart.update()
}

const debouncedRebuildDatasets = _.debounce(() => rebuildDatasets(), 200)

window.onload = function () {
  const ctx = (<HTMLCanvasElement> document.getElementById('canvas')).getContext('2d')
  chart = new Chart(ctx, config)
}

document.getElementById('gama-slider').addEventListener('input', function () {
  SISModel.gama = Number((<HTMLInputElement> this).value) / 100
  debouncedRebuildDatasets()
})

document.getElementById('beta-slider').addEventListener('input', function () {
  SISModel.beta = Number((<HTMLInputElement> this).value) / 100
  debouncedRebuildDatasets()
})

document.getElementById('infecteds-slider').addEventListener('input', function () {
  SISModel.infecteds = BigInt((<HTMLInputElement> this).value)
  debouncedRebuildDatasets()
})

document.getElementById('time-slider').addEventListener('input', function () {
  newTimePeriod = Number((<HTMLInputElement> this).value)
  debouncedRebuildDatasets()
})
