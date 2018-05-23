const valueTab = [
    {
        label: 'Bardzo dobry',
        color: '#57b108',
        icon: ''
    },
    {
        label: 'Dobry',
        color: '#b0dd10',
        icon: ''
    },
    {
        label: 'Umiarkowany',
        color: '#ffd911',
        icon: ''
    },
    {
        label: 'Dostateczny',
        color: '#e58100',
        icon: ''
    },
    {
        label: 'Zły',
        color: '#e50000',
        icon: ''
    },
    {
        label: 'Bardzo zły',
        color: '#990000',
        icon: ''
    },
    {
        label: 'Brak indeksu',
        color: '#bfbfbf',
        icon: ''
    },


];

const getIndex = (value) => valueTab.find((elem) => elem.label === value);

export  {
    getIndex
}
