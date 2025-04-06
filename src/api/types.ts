export interface Shop {
    id: number
    name: string
    address: string
    coordinates: {
        latitude: string
        longitude: string
    }
    openingHours: OpeningHours | null
}

export interface Saloon {
    id: number
    salonSize: string | null
    name: string
    location: {
        key: string
        name: string
    }
    address: string
    postalCode: string
    postalPlace: string
    coordinates: {
        latitude: string
        longitude: string
    }
    country: string
    active: boolean
    visibleInMap: boolean
    openingDate: string
    relativeLocation: string | null
    districts: Array<{ key: string; name: string; priority: number }>
    webPaymentProviders: Array<string> | null
}

export interface OpeningHours {
    salonId: number
    updatedAt: string
    updatedBy: number | null
    timeZone: string | null
    schedule: {
        mon: Schedule
        tue: Schedule
        wed: Schedule
        thu: Schedule
        fri: Schedule
        sat: Schedule
        sun: Schedule
    }
    exceptions: Array<Object>
}
interface Schedule {
    isOpen: boolean
    periods: Array<Period>
}

interface Period {
    from: {
        hours: number
        minutes: number
    }
    to: {
        hours: number
        minutes: number
    }
    open: boolean
}

export interface WaitTime {
    salonId: string
    salonWaitingTime: {
        waittime: null | string
        state: string
    }
    simulationTime: string | null
    customers: Array<Customer>
    scheduledBreaks: Array<Object>
}

interface Customer {
    queueId: number
    batchId: string
    transactionId: string
    customerId: string
    employeeId: number
    employeeName: string
    salonId: string
    bookingId: null | string
    publicId: string
    state: string
    customerName: string
    started: null | string
    registered: string
    source: string
    refunded: boolean
    isNewCustomer: boolean
    isAnonymous: boolean
    language: string
    isBooking: boolean
    products: Array<Object>
    estimatedWaittime: {
        waittime: string
        state: string
    }
}
