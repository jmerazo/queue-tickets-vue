var dependences = [
    {
        id: 1,
        name: "Despacho del Gobernador",
        code: 'DGU'
    },
    {
        id: 2,
        name: "Oficina Jurídica",
        code: 'OJU'
    },
    {
        id: 3,
        name: "Secretaría de Planeación",
        code: 'SPU'
    },
    {
        id: 4,
        name: "Secretaría de Hacienda",
        code: 'SHU'
    },
    {
        id: 5,
        name: "Secretaría de Gobierno",
        code: 'SGU'
    },
    {
        id: 6,
        name: "Secretaría de Desarrollo Social",
        code: 'SDS'
    },
    {
        id: 7,
        name: "Secretaría de Servicios Administrativos",
        code: 'SSA'
    },
    {
        id: 8,
        name:  "Oficina de Contratación",
        code: 'OCU'
    },
    {
        id: 9,
        name: "Secretaría de Infraestructura",
        code: 'SIU'
    },
    {
        id: 10,
        name: "Secretaría de Desarrollo Agropecuario y Medio Ambiente",
        code: 'SDA'
    },
    {
        id: 11,
        name: "Secretaría de Competitividad y Productividad",
        code: 'SCP'
    },
    {
        id: 12,
        name: "Secretaría de Educación",
        code: 'SEU'
    },
    {
        id: 13,
        name: "Secretaría de Salud",
        code: 'SSU'
    },
    {
        id: 14,
        name: "Indercultura",
        code: "IUU"
    },
    {
        id: 15,
        name: "Gestión de comunicaciones",
        code: 'GCU'
    },
    {
        id: 16,
        name: "Asesores de despacho",
        code: 'ADU'
    }
]

var subdependences = [
    {
        id: 1,
        name: "Control Interno de Gestión",
        code: 'CGI',
        dependence_id: 7
    },
    {
        id: 2,
        name: "Transito",
        code: 'TTO',
        dependence_id: 4
    },
    {
        id: 3,
        name: "Almacen General",
        code: 'AGL',
        dependence_id: 7
    },
    {
        id: 4,
        name: "Gestión Humana",
        code: 'GHA',
        dependence_id: 7
    },
    {
        id: 5,
        name: "Sistemas",
        code: 'STS',
        dependence_id: 7
    },
    {
        id: 6,
        name: "Ventanilla única",
        code: 'VUA',
        dependence_id: 7
    },
    {
        id: 7,
        name: "Tesorería",
        code: 'TRA',
        dependence_id: 4
    },
    {
        id: 8,
        name:  "Rentas",
        code: 'RAS',
        dependence_id: 4
    },
    {
        id: 9,
        name: "Contabilidad",
        code: 'CTD',
        dependence_id: 4
    },
    {
        id: 10,
        name: "Presupuesto",
        code: 'PSO',
        dependence_id: 4
    },
    {
        id: 11,
        name: "Pensiones",
        code: 'PSN',
        dependence_id: 4
    },
    {
        id: 12,
        name: "Salud pública",
        code: 'SPA',
        dependence_id: 13
    },
    {
        id: 13,
        name: "Vivienda",
        code: 'VVD',
        dependence_id: 9
    },
    {
        id: 14,
        name: "Vías",
        code: "VAS",
        dependence_id: 9
    },
    {
        id: 15,
        name: "Energía",
        code: 'EGA',
        dependence_id: 9
    },
    {
        id: 16,
        name: "Salud ocupacional",
        code: 'SOL',
        dependence_id: 7
    },
    {
        id: 17,
        name: "PDA",
        code: 'PDA',
        dependence_id: 9
    },
    {
        id: 18,
        name: "Aseguramiento",
        code: 'ATO',
        dependence_id: 13
    },
    {
        id: 19,
        name: "SGR",
        code: 'SGR',
        dependence_id: 9
    },
    {
        id: 20,
        name: "Principal",
        code: 'PDG',
        dependence_id: 1
    },
    {
        id: 21,
        name: "Principal",
        code: 'POJ',
        dependence_id: 2
    },
    {
        id: 22,
        name: "Principal",
        code: 'PSP',
        dependence_id: 3
    },
    {
        id: 23,
        name: "Principal",
        code: 'PSG',
        dependence_id: 5
    },
    {
        id: 24,
        name: "Principal",
        code: 'PDS',
        dependence_id: 6
    },
    {
        id: 25,
        name: "Principal",
        code: 'POC',
        dependence_id: 8
    },
    {
        id: 26,
        name: "Principal",
        code: 'PAM',
        dependence_id: 10
    },
    {
        id: 27,
        name: "Principal",
        code: 'PCP',
        dependence_id: 11
    },
    {
        id: 28,
        name: "Principal",
        code: 'PSE',
        dependence_id: 12
    },
    {
        id: 29,
        name: "Principal",
        code: 'PIT',
        dependence_id: 14
    },
    {
        id: 30,
        name: "Principal",
        code: 'PGC',
        dependence_id: 15
    },
    {
        id: 31,
        name: "Principal",
        code: 'PAD',
        dependence_id: 16
    }
]

var status = [
    {
        id: 0,
        name: 'Inactivo'
    },
    {
        id: 1,
        name: 'Activo'
    }
]

export default {
    dependences,
    subdependences,
    status
}