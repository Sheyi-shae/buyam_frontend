 export  function getFileFingerprint(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

