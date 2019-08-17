import { create_normalized_thickness } from './layersReducer';
import { randomColor } from 'randomcolor';

const layersInitialState = {
    "Layers": [
        {
            "index": 0,
            "Name": "C",
            "OptConstant": "C_0-1keV.dat",
            "RepetitionVal": 1.0,
            "RepetitionCheck": 0,
            "Thickness": 6.8,
            "DiffusionType": 3,
            "DiffusionVal": 10.0,
            "OrbitalName": "C1s",
            "OrbitalFile": "C1S.TXT",
            "BindingEnergy": 284.0,
            "IMFP": -1.0,
            "MolWeight": 12.0,
            "AtomZ": 6,
            "NumberOfAtoms": 1,
            "Density": 1.0,
            "NValence": 4,
            "Gap": 0.0,
            "Flag": 1,
            "RepDiffusionType": 1,
            "RepDiffusionVal": 0.0
        },
        {
            "index": 1,
            "Name": "SiO2",
            "OptConstant": "SiO2_0-10keV.dat",
            "RepetitionVal": 1.0,
            "RepetitionCheck": 0,
            "Thickness": 16.4,
            "DiffusionType": 3,
            "DiffusionVal": 3.0,
            "OrbitalName": "Si2p",
            "OrbitalFile": "SI2P.TXT",
            "BindingEnergy": 105.0,
            "IMFP": -1.0,
            "MolWeight": 60.0,
            "AtomZ": 8,
            "NumberOfAtoms": 2,
            "Density": 2.2,
            "NValence": 16,
            "Gap": 9.0,
            "Flag": 2,
            "RepDiffusionType": 1,
            "RepDiffusionVal": 0.0
        },
        {
            "index": 2,
            "Name": "Si",
            "OptConstant": "Si-0-10kev.txt",
            "RepetitionVal": 1.0,
            "RepetitionCheck": 0,
            "Thickness": 21.0,
            "DiffusionType": 1,
            "DiffusionVal": 0.0,
            "OrbitalName": "Si2p",
            "OrbitalFile": "SI2P.TXT",
            "BindingEnergy": 105.0,
            "IMFP": -1.0,
            "MolWeight": 28.0,
            "AtomZ": 14,
            "NumberOfAtoms": 1,
            "Density": 2.3,
            "NValence": 4,
            "Gap": 1.1,
            "Flag": 3,
            "RepDiffusionType": 1,
            "RepDiffusionVal": 0.0
        },
        {
            "index": 3,
            "Name": "MoSi2",
            "OptConstant": "MoSi2_0-10keV.dat",
            "RepetitionVal": 80.0,
            "RepetitionCheck": 1,
            "Thickness": 1.0,
            "DiffusionType": 1,
            "DiffusionVal": 0.0,
            "OrbitalName": "Si2p",
            "OrbitalFile": "SI2P.TXT",
            "BindingEnergy": 105.0,
            "IMFP": -1.0,
            "MolWeight": 152.0,
            "AtomZ": 14,
            "NumberOfAtoms": 1,
            "Density": 6.26,
            "NValence": 14,
            "Gap": 0.0,
            "Flag": 3,
            "RepDiffusionType": 3,
            "RepDiffusionVal": 5.0
        },
        {
            "index": 4,
            "Name": "Mo",
            "OptConstant": "Mo-0-10kev.txt",
            "RepetitionVal": 80.0,
            "RepetitionCheck": 1,
            "Thickness": 2.2,
            "DiffusionType": 1,
            "DiffusionVal": 0.0,
            "OrbitalName": "Mo3d",
            "OrbitalFile": "MO3D.TXT",
            "BindingEnergy": 230.0,
            "IMFP": -1.0,
            "MolWeight": 96.0,
            "AtomZ": 42,
            "NumberOfAtoms": 1,
            "Density": 10.3,
            "NValence": 6,
            "Gap": 0.0,
            "Flag": 0,
            "RepDiffusionType": 3,
            "RepDiffusionVal": 5.0
        },
        {
            "index": 5,
            "Name": "MoSi2",
            "OptConstant": "MoSi2_0-10keV.dat",
            "RepetitionVal": 80.0,
            "RepetitionCheck": 1,
            "Thickness": 13.0,
            "DiffusionType": 1,
            "DiffusionVal": 0.0,
            "OrbitalName": "Si2p",
            "OrbitalFile": "SI2P.TXT",
            "BindingEnergy": 105.0,
            "IMFP": -1.0,
            "MolWeight": 152.0,
            "AtomZ": 14,
            "NumberOfAtoms": 1,
            "Density": 6.26,
            "NValence": 14,
            "Gap": 0.0,
            "Flag": 3,
            "RepDiffusionType": 1,
            "RepDiffusionVal": 0.0
        },
        {
            "index": 6,
            "Name": "Si",
            "OptConstant": "Si-0-10kev.txt",
            "RepetitionVal": 80.0,
            "RepetitionCheck": 0,
            "Thickness": 18.6,
            "DiffusionType": 1,
            "DiffusionVal": 0.0,
            "OrbitalName": "Si2p",
            "OrbitalFile": "SI2P.TXT",
            "BindingEnergy": 105.0,
            "IMFP": -1.0,
            "MolWeight": 28.0,
            "AtomZ": 14,
            "NumberOfAtoms": 1,
            "Density": 2.3,
            "NValence": 4,
            "Gap": 1.1,
            "Flag": 3,
            "RepDiffusionType": 1,
            "RepDiffusionVal": 0.0
        }
    ],
    "Substrate": {
        "OrbitalName": "Si2p",
        "Name": "Si",
        "IMFP": -1.0,
        "OrbitalFile": "SI2P.TXT",
        "Thickness": 0.0,
        "NumberOfAtoms": 1.0,
        "NValence": 4.0,
        "Density": 2.3,
        "MolWeight": 28.0,
        "Gap": 1.0,
        "AtomZ": 14.0,
        "OptConstant": "Si-0-10kev.txt",
        "Flag": 0,
        "BindingEnergy": 0.0
    },
    "Vacuum": {
        "DiffusionType": 3,
        "Thickness": 100.0,
        "DiffusionVal": 0.0
    },
    "Calc": {
        "SpotSizeArea": 1,
        "WIT": 2,
        "CalcOrder": [
            3,
            2,
            1,
            5,
            4
        ],
        "Depth": [
            -100.0,
            0.5,
            500.0,
            0.0,
            50.0
        ],
        "TakeOff": [
            10.0,
            1.0,
            90.0,
            1.0,
            66.0
        ],
        "Wedge": [
            10.0,
            1.0,
            100.0,
            1.0,
            0.0
        ],
        "InBetween": [
            0.0,
            90.0
        ],
        "Mode": 3,
        "MCD": [
            1,
            3,
            2,
            5
        ],
        "ACS": "ACS_DIR",
        "PhEnergy": [
            500.0,
            5.0,
            1000.0,
            1.0,
            735.0
        ],
        "OPC": "OPC_DIR",
        "IncAngle": [
            11.07,
            0.03,
            13.5,
            0.0,
            45.0
        ],
        "IntMesh": [
            1.0,
            60.0
        ],
        "Polarization": 1
    }
}

const normalized_thickness = create_normalized_thickness(layersInitialState.Layers);
layersInitialState.Layers = layersInitialState.Layers.map((layer, idx) => {
  layer.NormalizedThickness = normalized_thickness[idx];
  layer.Thickness = parseFloat(layer.Thickness);
  if (!layer.Color) {
    layer.Color = randomColor();
  }
  return layer;
});

export default layersInitialState;
