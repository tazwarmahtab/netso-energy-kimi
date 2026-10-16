#!/usr/bin/env node

/**
 * Generates the small illustrative factory/site-study GLB used by /v2.
 *
 * This intentionally uses only Node's built-in Buffer/fs APIs. It writes
 * simple box primitives with flat PBR materials, so the output is portable,
 * deterministic, and does not require Blender, gltf-transform, or credentials.
 * The geometry is a fictional low-poly study model; it is not survey data.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const outputPath = resolve(process.cwd(), "public/assets/v2/site-study-factory.glb");

const materials = [
  { name: "Site ground", color: [0.16, 0.19, 0.16, 1], roughness: 0.96 },
  { name: "Weathered concrete", color: [0.38, 0.39, 0.34, 1], roughness: 0.92 },
  { name: "Roof membrane", color: [0.20, 0.25, 0.22, 1], roughness: 0.86 },
  { name: "Painted steel", color: [0.12, 0.15, 0.15, 1], metallic: 0.32, roughness: 0.64 },
  { name: "Loading edge", color: [0.25, 0.19, 0.14, 1], roughness: 0.82 },
  { name: "Service path", color: [0.65, 0.49, 0.22, 1], roughness: 0.76 },
  { name: "Roof utility", color: [0.43, 0.41, 0.34, 1], metallic: 0.12, roughness: 0.74 },
  { name: "Skylight", color: [0.24, 0.38, 0.38, 1], metallic: 0.08, roughness: 0.42 },
  { name: "Illustrative solar marker", color: [0.07, 0.15, 0.17, 1], metallic: 0.46, roughness: 0.38 },
  { name: "Solar frame", color: [0.70, 0.50, 0.18, 1], metallic: 0.62, roughness: 0.4 },
];

const geometryEntries = [];
const positions = [];
const normals = [];
const indices = [];

function addBox(name, center, size, material, extras = {}) {
  const [cx, cy, cz] = center;
  const [sx, sy, sz] = size;
  const x0 = cx - sx / 2;
  const x1 = cx + sx / 2;
  const y0 = cy - sy / 2;
  const y1 = cy + sy / 2;
  const z0 = cz - sz / 2;
  const z1 = cz + sz / 2;
  const faces = [
    { normal: [0, 0, 1], corners: [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]] },
    { normal: [0, 0, -1], corners: [[x0, y1, z0], [x1, y1, z0], [x1, y0, z0], [x0, y0, z0]] },
    { normal: [0, 1, 0], corners: [[x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0]] },
    { normal: [0, -1, 0], corners: [[x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [x0, y0, z0]] },
    { normal: [1, 0, 0], corners: [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]] },
    { normal: [-1, 0, 0], corners: [[x0, y1, z0], [x0, y0, z0], [x0, y0, z1], [x0, y1, z1]] },
  ];
  const baseVertex = positions.length / 3;
  const indexStart = indices.length;
  for (const face of faces) {
    for (const corner of face.corners) {
      positions.push(...corner);
      normals.push(...face.normal);
    }
  }
  for (let face = 0; face < faces.length; face += 1) {
    const start = baseVertex + face * 4;
    indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
  }

  geometryEntries.push({ name, material, extras, baseVertex, indexStart });
}

// Context and massing.
addBox("SiteGround", [0, 0, -0.35], [52, 36, 0.7], 0, { role: "illustrative-site-context" });
addBox("ServiceRoad", [0, -15.6, 0.04], [48, 3.4, 0.08], 3, { role: "loading-circulation" });
addBox("SideRoad", [23.8, 2.5, 0.05], [3.2, 25, 0.1], 3, { role: "loading-circulation" });
addBox("NeighboringRoofWest", [-22.5, 3.3, 2.2], [8.5, 11.5, 4.4], 2, { role: "restrained-context" });
addBox("NeighboringRoofEast", [21.5, -5.2, 2.8], [7.5, 9.5, 5.6], 1, { role: "restrained-context" });

addBox("MainProductionBlock", [-1, 0, 3.2], [30, 16, 6.4], 1, { role: "representative-production-block" });
addBox("OfficeBlock", [-11.7, -1.1, 4.25], [6.2, 7.1, 8.5], 1, { role: "factory-office-block" });
addBox("ElectricalInterfaceBlock", [12.2, 3.1, 4.1], [4.4, 5.8, 8.2], 1, { role: "representative-utility-edge" });

// Roof plane, parapet, and access geometry.
addBox("MainRoofPlane", [-1, 0, 6.52], [30.8, 16.8, 0.28], 2, { role: "roof-plane" });
addBox("ParapetFront", [-1, -8.35, 6.98], [31.4, 0.5, 0.86], 3, { role: "parapet-edge" });
addBox("ParapetBack", [-1, 8.35, 6.98], [31.4, 0.5, 0.86], 3, { role: "parapet-edge" });
addBox("ParapetWest", [-16.35, 0, 6.98], [0.5, 16.4, 0.86], 3, { role: "parapet-edge" });
addBox("ParapetEast", [14.35, 0, 6.98], [0.5, 16.4, 0.86], 3, { role: "parapet-edge" });
addBox("AccessPathLong", [-5.4, 0.2, 6.83], [1.15, 14.8, 0.1], 5, { role: "reference-access-path" });
addBox("AccessPathCross", [1.5, -2.4, 6.84], [12.8, 1.05, 0.1], 5, { role: "reference-access-path" });

// Roof equipment and obstructions.
for (const [index, x] of [-11.5, -7.2, -2.8, 2].entries()) {
  addBox(`RoofVent_${index + 1}`, [x, 4.25, 7.45], [2.2, 1.7, 1.15], 6, { role: "roof-utility-vent" });
  addBox(`RoofVentCap_${index + 1}`, [x, 4.25, 8.12], [2.5, 1.95, 0.18], 3, { role: "roof-utility-vent" });
}
addBox("SkylightWest", [5.5, 4.1, 6.99], [3.7, 2.2, 0.16], 7, { role: "roof-obstruction" });
addBox("SkylightEast", [9.8, 1.4, 6.99], [3.7, 2.2, 0.16], 7, { role: "roof-obstruction" });
addBox("ServiceUtilityBox", [8.9, -4.8, 7.5], [2.2, 1.7, 1.55], 6, { role: "roof-utility-box" });
addBox("ServiceUtilityCap", [8.9, -4.8, 8.35], [2.45, 1.95, 0.18], 3, { role: "roof-utility-box" });

// A compact, visibly restrained reference solar field. It is a marker only.
let panelNumber = 1;
for (const y of [-1.1, 0.4, 1.9]) {
  for (const x of [3.2, 6.2, 9.2]) {
    addBox(`IllustrativeSolarPanel_${panelNumber}`, [x, y, 7.04], [2.6, 1.05, 0.08], 8, {
      role: "illustrative-solar-reference",
      disclosure: "reference marker only; not an installed project",
    });
    panelNumber += 1;
  }
}
addBox("SolarFieldFrameWest", [1.86, 0.4, 7.0], [0.09, 4.3, 0.12], 9, { role: "illustrative-solar-reference" });
addBox("SolarFieldFrameEast", [10.54, 0.4, 7.0], [0.09, 4.3, 0.12], 9, { role: "illustrative-solar-reference" });

// Loading apron, canopy, bays, and a conceptual electrical route marker.
addBox("LoadingApron", [0, -10.4, 0.12], [31, 3.8, 0.24], 4, { role: "loading-edge" });
addBox("LoadingCanopy", [0, -8.95, 5.45], [23, 1.25, 0.28], 3, { role: "loading-edge" });
for (const [index, x] of [-9, 0, 9].entries()) {
  addBox(`LoadingCanopyPost_${index + 1}`, [x, -8.95, 2.8], [0.3, 0.3, 5.2], 3, { role: "loading-edge" });
  addBox(`LoadingBayDoor_${index + 1}`, [x, -8.08, 3.0], [4.7, 0.12, 4.1], 4, { role: "loading-edge" });
}
addBox("ExampleElectricalRouteRoof", [11.5, -1.5, 7.08], [0.32, 6.2, 0.08], 5, { role: "example-electrical-route" });
addBox("ExampleElectricalRouteWall", [11.5, -4.85, 4.9], [0.32, 0.32, 3.9], 5, { role: "example-electrical-route" });
addBox("ExampleElectricalInterface", [11.5, -5.05, 2.55], [2.3, 0.7, 2.8], 6, {
  role: "representative-utility-edge",
  disclosure: "example electrical context; not a surveyed connection",
});

const vertexBytes = Buffer.alloc((positions.length + normals.length) * 4);
for (let index = 0; index < positions.length; index += 1) vertexBytes.writeFloatLE(positions[index], index * 4);
for (let index = 0; index < normals.length; index += 1) {
  vertexBytes.writeFloatLE(normals[index], (positions.length + index) * 4);
}
const indexOffset = vertexBytes.length;
const indexBytes = Buffer.alloc(indices.length * 2);
for (let index = 0; index < indices.length; index += 1) indexBytes.writeUInt16LE(indices[index], index * 2);
const binary = Buffer.concat([vertexBytes, indexBytes]);

const vertexByteLength = positions.length * 4;
const normalByteOffset = vertexByteLength;
const bufferViews = [
  { buffer: 0, byteOffset: 0, byteLength: vertexByteLength, target: 34962 },
  { buffer: 0, byteOffset: normalByteOffset, byteLength: normals.length * 4, target: 34962 },
  { buffer: 0, byteOffset: indexOffset, byteLength: indexBytes.length, target: 34963 },
];

const accessors = [];
const meshes = [];
const meshNodes = [];
const verticesPerBox = 24;
const indicesPerBox = 36;
for (const entry of geometryEntries) {
  const positionStart = entry.baseVertex * 3;
  const positionEnd = positionStart + verticesPerBox * 3;
  const objectMin = [Infinity, Infinity, Infinity];
  const objectMax = [-Infinity, -Infinity, -Infinity];
  for (let index = positionStart; index < positionEnd; index += 3) {
    for (let axis = 0; axis < 3; axis += 1) {
      objectMin[axis] = Math.min(objectMin[axis], positions[index + axis]);
      objectMax[axis] = Math.max(objectMax[axis], positions[index + axis]);
    }
  }
  const positionAccessor = accessors.length;
  accessors.push({
    bufferView: 0,
    byteOffset: entry.baseVertex * 3 * 4,
    componentType: 5126,
    count: verticesPerBox,
    type: "VEC3",
    min: objectMin,
    max: objectMax,
  });
  const normalAccessor = accessors.length;
  accessors.push({
    bufferView: 1,
    byteOffset: entry.baseVertex * 3 * 4,
    componentType: 5126,
    count: verticesPerBox,
    type: "VEC3",
  });
  const indexAccessor = accessors.length;
  accessors.push({
    bufferView: 2,
    byteOffset: entry.indexStart * 2,
    componentType: 5123,
    count: indicesPerBox,
    type: "SCALAR",
    min: [entry.baseVertex],
    max: [entry.baseVertex + verticesPerBox - 1],
  });
  const meshIndex = meshes.length;
  meshes.push({
    name: entry.name,
    primitives: [{ attributes: { POSITION: positionAccessor, NORMAL: normalAccessor }, indices: indexAccessor, material: entry.material }],
  });
  meshNodes.push({ name: entry.name, mesh: meshIndex, extras: entry.extras });
}

const gltf = {
  asset: {
    version: "2.0",
    generator: "Netso illustrative site-study GLB generator",
    extras: {
      studyType: "illustrative garment-factory roof/site study",
      sourceStatus: "local-generated-geometry",
      surveyData: false,
      solarOverlay: "reference markers only",
    },
  },
  scene: 0,
  scenes: [{ name: "RepresentativeFactorySiteStudy", nodes: [0] }],
  nodes: [
    {
      name: "RepresentativeFactorySiteStudy",
      children: meshNodes.map((_, index) => index + 1),
      extras: { provenanceLabel: "Representative garment facility · illustrative site study" },
    },
    ...meshNodes,
  ],
  meshes,
  materials: materials.map(({ name, color, metallic = 0, roughness = 0.8 }) => ({
    name,
    pbrMetallicRoughness: { baseColorFactor: color, metallicFactor: metallic, roughnessFactor: roughness },
  })),
  accessors,
  bufferViews,
  buffers: [{ byteLength: binary.length }],
};

const json = Buffer.from(JSON.stringify(gltf));
const jsonPadding = (4 - (json.length % 4)) % 4;
const binPadding = (4 - (binary.length % 4)) % 4;
const paddedJson = Buffer.concat([json, Buffer.alloc(jsonPadding, 0x20)]);
const paddedBinary = Buffer.concat([binary, Buffer.alloc(binPadding)]);
const totalLength = 12 + 8 + paddedJson.length + 8 + paddedBinary.length;
const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(totalLength, 8);
const jsonHeader = Buffer.alloc(8);
jsonHeader.writeUInt32LE(paddedJson.length, 0);
jsonHeader.writeUInt32LE(0x4e4f534a, 4);
const binaryHeader = Buffer.alloc(8);
binaryHeader.writeUInt32LE(paddedBinary.length, 0);
binaryHeader.writeUInt32LE(0x004e4942, 4);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, Buffer.concat([header, jsonHeader, paddedJson, binaryHeader, paddedBinary]));
console.log(`Wrote ${outputPath}`);
console.log(`Meshes: ${meshes.length}; vertices: ${positions.length / 3}; triangles: ${indices.length / 3}`);
console.log(`Size: ${Buffer.byteLength(Buffer.concat([header, jsonHeader, paddedJson, binaryHeader, paddedBinary]))} bytes`);
