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
// **** Default values for testing DELETE BEFORE LAUNCH
document.getElementById('Width').value = 10
document.getElementById('Height').value = 15
document.getElementById('Length').value = 25
document.getElementById('CostPerUnit').value = 15
document.getElementById('UnitsPerMonth').value = 5000
document.getElementById('Weight').value = 0.5

// Buttons
const calcStartButton = document.getElementById('CalcStart')
const calcNext1Button = document.getElementById('CalcNext1')
const calcNext2Button = document.getElementById('CalcNext2')
const calcNext3Button = document.getElementById('CalcNext3')
const calcNext4Button = document.getElementById('CalcNext4')
const calcSubmitMainButton = document.getElementById('CalcSubmitMain')
// Form Fields
let unitType,
  weight,
  unitsPerMonth,
  costPerUnit,
  width,
  height,
  length,
  containerSize,
  containerUtilization,
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
  inventoryFinancingCost,
  customsClearance,
  importerSecurityFilingBond,
  handlingFee,
  drayage,
  chassis,
  congestionFee,
  securitySurcharge,
  inlandFuelSurcharge,
  hazmat,
  delivery,
  detentionFee,
  prePull

calcSubmitMainButton.addEventListener('click', function (e) {
  e.preventDefault

  unitType = document.getElementById('UnitType').value
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
  customsClearance = document.getElementById('CustomsClearance').value
  importerSecurityFilingBond = document.getElementById(
    'ImporterSecurityFilingBond'
  ).value
  handlingFee = document.getElementById('HandlingFee').value
  drayage = document.getElementById('Drayage').value
  chassis = document.getElementById('Chassis').value
  congestionFee = document.getElementById('CongestionFee').value
  securitySurcharge = document.getElementById('SecuritySurcharge').value
  inlandFuelSurcharge = document.getElementById('InlandFuelSurcharge').value
  hazmat = document.getElementById('Hazmat').value
  delivery = document.getElementById('Delivery').value
  detentionFee = document.getElementById('DetentionFee').value
  prePull = document.getElementById('PrePull').value
  // *** CALCULATIONS ***
  if (apr > 0) {
    inventoryFinancingCost =
      costPerUnit * (apr / 100) * (daysUntilPayment / 365)
  } else {
    inventoryFinancingCost = costPerUnit * (three / 12)
  }

  if (containerSize === '20FT') {
    containerUtilization = 92
  } else {
    containerUtilization = 100
  }

  const itemVolume = calculateItemVolume(width, height, length, unitType)
  const maxUnitsPerContainer = calculateMaxUnits(
    itemVolume,
    containerSize,
    unitType,
    containerUtilization
  ) // 92% utilization ???????
  let oceanFreight = costPerContainerOcean / maxUnitsPerContainer

  let customsClearanceCalculated = customsClearance / maxUnitsPerContainer
  let importerSecurityFilingBondCalculated =
    importerSecurityFilingBond / maxUnitsPerContainer
  let handlingFeeCalculated = handlingFee / maxUnitsPerContainer
  let drayageCalculated = drayage / maxUnitsPerContainer
  let chassisCalculated = chassis / maxUnitsPerContainer
  let congestionFeeCalculated = congestionFee / maxUnitsPerContainer
  let securitySurchargeCalculated = securitySurcharge / maxUnitsPerContainer
  let inlandFuelSurchargeCalculated = inlandFuelSurcharge / maxUnitsPerContainer
  let hazmatCalculated = hazmat / maxUnitsPerContainer
  let deliveryCalculated = delivery / maxUnitsPerContainer
  let detentionFeeCalculated = detentionFee / maxUnitsPerContainer
  let prePullCalculated = prePull / maxUnitsPerContainer

  let customsTarifRate = costPerUnit * (averageImportDutiesRateOcean / 100)

  let monthlyAccountFee = threePLMonthlyFee / unitsPerMonth

  let calculatedItemsPerPallet = calculateItemsPerPallet(itemVolume, unitType)
  let receivingInboundFee =
    receivingInboundFeePerPallet / calculatedItemsPerPallet

  let storageWarehouseFee =
    (storageWarehouseFeePerCubicFoot * unitsPerMonth * itemVolume) /
    unitsPerMonth

  let overstockCost =
    (costPerUnit * unitsPerMonth * (overstockClearanceItems / 100)) /
    unitsPerMonth

  let totalPrice =
    parseFloat(inventoryFinancingCost) +
    parseFloat(oceanFreight) +
    parseFloat(customsClearanceCalculated) +
    parseFloat(importerSecurityFilingBondCalculated) +
    parseFloat(handlingFeeCalculated) +
    parseFloat(drayageCalculated) +
    parseFloat(chassisCalculated) +
    parseFloat(congestionFeeCalculated) +
    parseFloat(securitySurchargeCalculated) +
    parseFloat(inlandFuelSurchargeCalculated) +
    parseFloat(hazmatCalculated) +
    parseFloat(deliveryCalculated) +
    parseFloat(detentionFeeCalculated) +
    parseFloat(prePullCalculated) +
    parseFloat(customsTarifRate) +
    parseFloat(monthlyAccountFee) +
    parseFloat(receivingInboundFee) +
    parseFloat(storageWarehouseFee) +
    parseFloat(pickPackPerOrder) +
    parseFloat(materiialsFeePerOrder) +
    parseFloat(averageShippingCostPerOrder) +
    parseFloat(overstockCost)

  // console.log('costPerUnit: ' + costPerUnit)
  // console.log('apr: ' + apr)
  // console.log('daysUntilPayment: ' + daysUntilPayment / 365)
  // console.log('Inventory Financing Cost: ' + inventoryFinancingCost)

  console.log('====================================')

  console.log('inventoryFinancingCost: ' + inventoryFinancingCost)
  console.log('calculateMaxUnits: ' + maxUnitsPerContainer)
  console.log('oceanFreight: ' + oceanFreight)
  console.log('customsClearanceCalculated: ' + customsClearanceCalculated)
  console.log(
    'importerSecurityFilingBondCalculated: ' +
      importerSecurityFilingBondCalculated
  )
  console.log('handlingFeeCalculated: ' + handlingFeeCalculated)
  console.log('drayageCalculated: ' + drayageCalculated)
  console.log('chassisCalculated: ' + chassisCalculated)
  console.log('congestionFeeCalculated: ' + congestionFeeCalculated)
  console.log('securitySurchargeCalculated: ' + securitySurchargeCalculated)
  console.log('inlandFuelSurchargeCalculated: ' + inlandFuelSurchargeCalculated)
  console.log('hazmatCalculated: ' + hazmatCalculated)
  console.log('deliveryCalculated: ' + deliveryCalculated)
  console.log('detentionFeeCalculated: ' + detentionFeeCalculated)
  console.log('prePullCalculated: ' + prePullCalculated)
  console.log('customsTarifRate: ' + customsTarifRate)
  console.log('monthlyAccountFee: ' + monthlyAccountFee)
  console.log('receivingInboundFee: ' + receivingInboundFee)
  console.log('storageWarehouseFee: ' + storageWarehouseFee)

  console.log('pickPackPerOrder: ' + pickPackPerOrder)
  console.log('materiialsFeePerOrder: ' + materiialsFeePerOrder)
  console.log('averageShippingCostPerOrder: ' + averageShippingCostPerOrder)
  console.log('overstockCost: ' + overstockCost)
  console.log('====================================')
  console.log('Total Price: ' + totalPrice)
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

function calculateItemVolume(
  length,
  width,
  height,
  measuringUnit = 'imperial'
) {
  if (measuringUnit === 'imperial') {
    return (length / 12) * (width / 12) * (height / 12) // Cubic feet per cubic inch
  } else {
    return length * width * height // Cubic meters
  }
}

function calculateMaxUnits(
  itemVolume,
  containerType,
  measuringUnit = 'imperial',
  utilizationPercentage = 92
) {
  // Get container volume based on type
  const containerVolume = {
    '20FT': 1170.23, // Cubic feet
    '40FT': 2386.08, // Cubic feet
    LCL: 55.0 // Cubic feet
  }[containerType]

  // Calculate the maximum number of units that can fit
  const maxUnits =
    (containerVolume / itemVolume) * (utilizationPercentage / 100)

  return Math.round(maxUnits)
}

function calculateItemsPerPallet(
  itemVolume,
  measuringUnit = 'imperial',
  palletUtilization = 79
) {
  if (measuringUnit === 'imperial') {
    return (65.824721 * (palletUtilization / 100)) / itemVolume
  } else {
    return (65.824721 * 0.0283168 * (palletUtilization / 100)) / itemVolume
  }
}
