import React from "react";

const hRange = [0, 360];
const sRange = [50, 75];
const lRange = [25, 60];

type HSL = number[];

const getHashOfString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};

const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min);
};

const generateHSL = (name: string): HSL => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0], sRange[1]);
  const l = normalizeHash(hash, lRange[0], lRange[1]);
  return [h, s, l];
};

const HSLtoString = (hsl: HSL) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

type InitialsAvatarProps = {
  firstName: string;
  lastName: string;
  fontSize?: string;
  width?: string;
  height?: string;
};

const InitialsAvatar = ({
  firstName,
  lastName,
  fontSize
}: InitialsAvatarProps) => {
  const bgColor = HSLtoString(generateHSL(firstName));
  return (
    <div
      style={{
        backgroundColor: bgColor
      }}
      className="flex h-full w-full items-center justify-center rounded-full p-2 text-white"
    >
      <div className={fontSize}>
        {firstName[0]}
        {lastName[0]}
      </div>
    </div>
  );
};

export default InitialsAvatar;
