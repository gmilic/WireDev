console.log('portless.js loaded')
// Default values
document.getElementById('CustomsClearance').value = 150
document.getElementById('ImporterSecurityFilingBond').value = 150
document.getElementById('HandlingFee').value = 150
document.getElementById('Drayage').value = 1500
document.getElementById('Chassis').value = 250
document.getElementById('CongestionFee').value = 100
document.getElementById('SecuritySurcharge').value = 25
document.getElementById('InlandFuelSurcharge').value = 125
document.getElementById('Hazmat').value = 25
document.getElementById('Delivery').value = 400
document.getElementById('DetentionFee').value = 100
document.getElementById('PrePull').value = 200
// Buttons
const calcStartButton = document.getElementById('CalcStart')
const calcNext1Button = document.getElementById('CalcNext1')
const calcNext2Button = document.getElementById('CalcNext2')
const calcNext3Button = document.getElementById('CalcNext3')
const calcNext4Button = document.getElementById('CalcNext4')
const calcSubmitMainButton = document.getElementById('CalcSubmitMain')
// Form Fields
let weight,
  unitsPerMonth,
  costPerUnit,
  width,
  height,
  length,
  containerSize,
  costPerContainerOcean,
  averageImportDutiesRateOcean,
  averageCostPerKiloAir,
  averageImportDutiesRateAir,
  threePLMonthlyFee,
  receivingInboundFeePerPallet,
  storageWarehouseFeePerCubicFoot,
  pickPackPerOrder,
  materiialsFeePerOrder,
  averageShippingCostPerOrder,
  apr,
  overstockClearanceItems,
  daysUntilPayment,
  inventoryFinancingCost

calcSubmitMainButton.addEventListener('click', function (e) {
  e.preventDefault

  weight = document.getElementById('Weight').value
  unitsPerMonth = document.getElementById('UnitsPerMonth').value
  costPerUnit = document.getElementById('CostPerUnit').value
  width = document.getElementById('Width').value
  height = document.getElementById('Height').value
  length = document.getElementById('Length').value
  containerSize = document.getElementById('ContainerSize').value
  costPerContainerOcean = document.getElementById('CostPerContainerOcean').value
  averageImportDutiesRateOcean = document.getElementById(
    'AverageImportDutiesRateOcean'
  ).value
  averageCostPerKiloAir = document.getElementById('AverageCostPerKiloAir').value
  averageImportDutiesRateAir = document.getElementById(
    'AverageImportDutiesRateAir'
  ).value
  threePLMonthlyFee = document.getElementById('3PLMonthlyFee').value
  receivingInboundFeePerPallet = document.getElementById(
    'ReceivingInboundFeePerPallet'
  ).value
  storageWarehouseFeePerCubicFoot = document.getElementById(
    'StorageWarehouseFeePerCubicFoot'
  ).value
  pickPackPerOrder = document.getElementById('PickPackPerOrder').value
  materiialsFeePerOrder = document.getElementById('MateriialsFeePerOrder').value
  averageShippingCostPerOrder = document.getElementById(
    'AverageShippingCostPerOrder'
  ).value
  apr = document.getElementById('APR').value
  overstockClearanceItems = document.getElementById(
    'OverstockClearanceItems'
  ).value
  daysUntilPayment = document.getElementById('DaysUntilPayment').value

  if (apr > 0) {
    inventoryFinancingCost =
      costPerUnit * (apr / 100) * (daysUntilPayment / 365)
  } else {
    inventoryFinancingCost = costPerUnit * (three / 12)
  }

  let one = 1
  let two = 2
  let three = 3
  let four = 4

  let oceanFreight = one / two
  let customsClearance = one / two
  let ImporterSecurityFilingBond = one / two
  let handlingFee = one / two
  let drayage = one / two
  let chassis = one / two
  let congestionFee = one / two
  let securitySurcharge = one / two
  let inlandFuelSurcharge = one / two
  let hazmat = one / two
  let delivery = one / two
  let detentionFee = one / two
  let PrePull = one / two
  let customsTarifRate = one * two
  let monthlyAccountFee = one / two
  let receivingInboundFee = one / two
  let storageWarehouseFee = (one * two * three) / four
  let overstockCost = (one * two * three) / four

  let totalPrice =
    inventoryFinancingCost +
    oceanFreight +
    customsClearance +
    ImporterSecurityFilingBond +
    handlingFee +
    drayage +
    chassis +
    congestionFee +
    securitySurcharge +
    inlandFuelSurcharge +
    hazmat +
    delivery +
    detentionFee +
    PrePull +
    customsTarifRate +
    monthlyAccountFee +
    receivingInboundFee +
    storageWarehouseFee +
    pickPackPerOrder +
    materiialsFeePerOrder +
    averageShippingCostPerOrder +
    overstockCost

  console.log('costPerUnit: ' + costPerUnit)
  console.log('apr: ' + apr)
  console.log('daysUntilPayment: ' + daysUntilPayment / 365)
  console.log('Total Price: ' + totalPrice)
  console.log('Inventory Financing Cost: ' + inventoryFinancingCost)
})

/*

Ocean/Air: 
Current method
-Ocean Freight
-Air Freight

ocean-group
calc-green-box_ocean-group
airFreight-group


GreenBox:
AverageCustomsRateWrap

*/
