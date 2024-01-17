// CONSTS
const PRICE_PER_KILO_AIR = 4
const PRICE_PER_POUND_AIR = 1.81
document.getElementById('airFreight-group').style.display = 'none'
// Sections
const step00 = document.getElementById('calc-step-00')
const step01 = document.getElementById('calc-step-01')
const step02 = document.getElementById('calc-step-02')
const step03 = document.getElementById('calc-step-03')
const step04 = document.getElementById('calc-step-04')
const step05 = document.getElementById('calc-step-05')
// hide sections
step01.classList.add('hidden-section')
step02.classList.add('hidden-section')
step03.classList.add('hidden-section')
step04.classList.add('hidden-section')
step05.classList.add('hidden-section')
// Buttons
const calcStartButton = document.getElementById('CalcStart')
const calcNext1Button = document.getElementById('CalcNext1')
const calcNext2Button = document.getElementById('CalcNext2')
const calcNext3Button = document.getElementById('CalcNext3')
const calcNext4Button = document.getElementById('CalcNext4')
const calcSubmitMainButton = document.getElementById('CalcSubmitMain')

calcStartButton.addEventListener('click', function (e) {
  e.preventDefault
  step00.classList.add('hidden-section')
  step01.classList.remove('hidden-section')
  step01.classList.add('show-section')
  window.scrollTo(0, 0)
})
calcNext1Button.addEventListener('click', function (e) {
  e.preventDefault
  step01.classList.add('hidden-section')
  step02.classList.remove('hidden-section')
  step02.classList.add('show-section')
  window.scrollTo(0, 0)
})
calcNext2Button.addEventListener('click', function (e) {
  e.preventDefault
  step02.classList.add('hidden-section')
  step03.classList.remove('hidden-section')
  step03.classList.add('show-section')
  window.scrollTo(0, 0)
})
calcNext3Button.addEventListener('click', function (e) {
  e.preventDefault
  step03.classList.add('hidden-section')
  step04.classList.remove('hidden-section')
  step04.classList.add('show-section')
  window.scrollTo(0, 0)
})
calcNext4Button.addEventListener('click', function (e) {
  e.preventDefault
  step04.classList.add('hidden-section')
  step05.classList.remove('hidden-section')
  step05.classList.add('show-section')
  window.scrollTo(0, 0)
})

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
document.getElementById('CostPerUnit').value = 15
document.getElementById('UnitsPerMonth').value = 5000
document.getElementById('Width').value = 15
document.getElementById('Height').value = 25
document.getElementById('Length').value = 20
document.getElementById('Weight').value = 0.5
// document.getElementById('Width').value = 38.1
// document.getElementById('Height').value = 63.5
// document.getElementById('Length').value = 50.8
// document.getElementById('Weight').value = 0.226796

// Radio buttons
const currentImportMethodElement = document.getElementsByName('CurrentMethod')
for (let i = 0, length = currentImportMethodElement.length; i < length; i++) {
  currentImportMethodElement[i].addEventListener('click', function (e) {
    if (document.getElementById('OceanFreight').checked) {
      document.getElementById('ocean-group').style.display = 'block'
      document.getElementById('calc-green-box_ocean-group').style.display =
        'block'
      document.getElementById('airFreight-group').style.display = 'none'
    } else {
      document.getElementById('ocean-group').style.display = 'none'
      document.getElementById('calc-green-box_ocean-group').style.display =
        'none'
      document.getElementById('airFreight-group').style.display = 'block'
    }
  })
}
// container sizes defaults
containerSizeElement = document.getElementById('ContainerSize')
costPerContainerHiddenElement = document.getElementById('CostPerContainerOcean')
containerSizeElement.addEventListener('change', function (e) {
  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('change', false, true)
  if (containerSizeElement.value === 'LCL') {
    costPerContainerHiddenElement.value = 2000
    costPerContainerHiddenElement.dispatchEvent(evt)
  } else if (containerSizeElement.value === '20FT') {
    costPerContainerHiddenElement.value = 3000
    costPerContainerHiddenElement.dispatchEvent(evt)
  } else if (containerSizeElement.value === '40FT') {
    costPerContainerHiddenElement.value = 4000
    costPerContainerHiddenElement.dispatchEvent(evt)
  }
})

// Vars for calculations
let unitType,
  itemWeight,
  unitsPerMonth,
  costPerUnit,
  itemWidth,
  itemHeight,
  itemLength,
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
  prePull,
  currentImportMethod

calcSubmitMainButton.addEventListener('click', function (e) {
  e.preventDefault

  unitType = document.getElementById('UnitType').value
  itemWeight = document.getElementById('Weight').value
  unitsPerMonth = document.getElementById('UnitsPerMonth').value
  costPerUnit = document.getElementById('CostPerUnit').value
  itemWidth = document.getElementById('Width').value
  itemHeight = document.getElementById('Height').value
  itemLength = document.getElementById('Length').value
  containerSize = document.getElementById('ContainerSize').value

  costPerContainerOcean = document.getElementById('CostPerContainerOcean').value
  if (costPerContainerOcean == 0) {
    costPerContainerOcean = 0.000000001
  }
  averageImportDutiesRateOcean = document.getElementById(
    'AverageImportDutiesRateOcean'
  ).value
  if (averageImportDutiesRateOcean == 0) {
    averageImportDutiesRateOcean = 0.000000001
  }
  averageCostPerKiloAir = document.getElementById('AverageCostPerKiloAir').value
  if (averageCostPerKiloAir == 0) {
    averageCostPerKiloAir = 0.000000001
  }
  averageImportDutiesRateAir = document.getElementById(
    'AverageImportDutiesRateAir'
  ).value
  if (averageImportDutiesRateAir == 0) {
    averageImportDutiesRateAir = 0.000000001
  }
  threePLMonthlyFee = document.getElementById('3PLMonthlyFee').value
  if (threePLMonthlyFee == 0) {
    threePLMonthlyFee = 0.000000001
  }
  receivingInboundFeePerPallet = document.getElementById(
    'ReceivingInboundFeePerPallet'
  ).value
  if (receivingInboundFeePerPallet == 0) {
    receivingInboundFeePerPallet = 0.000000001
  }
  storageWarehouseFeePerCubicFoot = document.getElementById(
    'StorageWarehouseFeePerCubicFoot'
  ).value
  if (storageWarehouseFeePerCubicFoot == 0) {
    storageWarehouseFeePerCubicFoot = 0.000000001
  }
  pickPackPerOrder = document.getElementById('PickPackPerOrder').value
  if (pickPackPerOrder == 0) {
    pickPackPerOrder = 0.000000001
  }
  materiialsFeePerOrder = document.getElementById('MateriialsFeePerOrder').value
  if (materiialsFeePerOrder == 0) {
    materiialsFeePerOrder = 0.000000001
  }
  averageShippingCostPerOrder = document.getElementById(
    'AverageShippingCostPerOrder'
  ).value
  if (averageShippingCostPerOrder == 0) {
    averageShippingCostPerOrder = 0.000000001
  }
  apr = document.getElementById('APR').value
  if (apr == 0) {
    apr = 0.000000001
  }
  overstockClearanceItems = document.getElementById(
    'OverstockClearanceItems'
  ).value
  if (overstockClearanceItems == 0) {
    overstockClearanceItems = 0.000000001
  }

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
  // currentImportMethod Radios
  for (let i = 0, length = currentImportMethodElement.length; i < length; i++) {
    if (currentImportMethodElement[i].checked) {
      currentImportMethod = currentImportMethodElement[i].value
      break
    }
  }

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

  const itemVolume = calculateItemVolume(
    itemLength,
    itemWidth,
    itemHeight,
    unitType
  )
  const maxUnitsPerContainer = calculateMaxUnitsPerContainer(
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

  let storageWarehouseFee

  if (unitType === 'imperial') {
    storageWarehouseFee =
      (storageWarehouseFeePerCubicFoot * unitsPerMonth * itemVolume) /
      unitsPerMonth
  } else if (unitType === 'metric') {
    // 1 cu m = 35.3147 cu ft
    storageWarehouseFee =
      (storageWarehouseFeePerCubicFoot * 35.3147 * unitsPerMonth * itemVolume) /
      unitsPerMonth
  }

  let overstockCost =
    (costPerUnit * unitsPerMonth * (overstockClearanceItems / 100)) /
    unitsPerMonth

  let totalPrice
  //  Common COSTS
  totalPrice =
    parseFloat(inventoryFinancingCost) +
    parseFloat(customsTarifRate) +
    parseFloat(monthlyAccountFee) +
    parseFloat(receivingInboundFee) +
    parseFloat(storageWarehouseFee) +
    parseFloat(pickPackPerOrder) +
    parseFloat(materiialsFeePerOrder) +
    parseFloat(averageShippingCostPerOrder)

  // Air Freight COSTS

  if (currentImportMethod === 'AirFreight') {
    let pricePerWeightUnit
    if (unitType === 'imperial') {
      pricePerWeightUnit = PRICE_PER_POUND_AIR
    } else {
      pricePerWeightUnit = PRICE_PER_KILO_AIR
    }
    let airFreightCalculated = pricePerWeightUnit * itemWeight
    totalPrice = totalPrice + airFreightCalculated
  }

  // LCL COSTS
  if (currentImportMethod === 'OceanFreight') {
    totalPrice =
      totalPrice +
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
      parseFloat(prePullCalculated)
  }

  // 20FT and 40FT COSTS
  if (
    currentImportMethod === 'OceanFreight' &&
    (containerSize === '20FT' || containerSize === '40FT')
  ) {
    totalPrice = totalPrice + parseFloat(overstockCost)
  }

  totalPrice = roundToTwoDecimalPlaces(totalPrice)
  document.getElementById('CalculatedPrice').value = totalPrice
  // write total price in sesion storage
  sessionStorage.setItem('totalPrice', totalPrice)

  //redirect to results page
  // window.location.href = '/calc/result'

  console.log('====================================')

  console.log('inventoryFinancingCost: ' + inventoryFinancingCost)
  console.log('calculateMaxUnitsPerContainer: ' + maxUnitsPerContainer)
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
  console.log('====================================')
})

function calculateItemVolume(
  length,
  width,
  height,
  measuringUnit = 'imperial'
) {
  if (measuringUnit === 'imperial') {
    return (length / 12) * (width / 12) * (height / 12) // Cubic feet per cubic inch
  } else {
    return (length * width * height) / 1000000 // Cubic meters
  }
}

function calculateMaxUnitsPerContainer(
  itemVolume,
  containerType,
  measuringUnit = 'imperial',
  utilizationPercentage = 92
) {
  // Get container volume based on type
  const containerVolumeImperial = {
    '20FT': 1170.23, // Cubic feet
    '40FT': 2386.08, // Cubic feet
    LCL: 55.0 // Cubic feet
  }[containerType]
  const containerVolumeMetric = {
    '20FT': 33.13729629, // Cubic meters
    '40FT': 67.56615014, // Cubic meters
    LCL: 1.557424 // Cubic meters
  }[containerType]

  // Calculate the maximum number of units that can fit
  if (measuringUnit === 'imperial') {
    return (
      (containerVolumeImperial / itemVolume) * (utilizationPercentage / 100)
    )
  } else {
    return (containerVolumeMetric / itemVolume) * (utilizationPercentage / 100)
  }
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

function roundToTwoDecimalPlaces(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}
