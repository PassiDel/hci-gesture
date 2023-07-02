import wasmLoader from '@mediapipe/tasks-vision/wasm/vision_wasm_internal.js?url';
import wasm from '@mediapipe/tasks-vision/wasm/vision_wasm_internal.wasm?url';
import wasmNosimdLoader from '@mediapipe/tasks-vision/wasm/vision_wasm_nosimd_internal.js?url';
import wasmNosimd from '@mediapipe/tasks-vision/wasm/vision_wasm_nosimd_internal.wasm?url';

const WASM_SIMD_CHECK = new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8,
  0, 65, 0, 253, 15, 253, 98, 11
]);
let supportsSimd = false;
async function isSimdSupported() {
  if (void 0 === supportsSimd)
    try {
      await WebAssembly.instantiate(WASM_SIMD_CHECK);
      supportsSimd = true;
    } catch (e) {
      supportsSimd = false;
    }
  return supportsSimd;
}

export async function fileset() {
  return (await isSimdSupported())
    ? {
        wasmLoaderPath: wasmLoader,
        wasmBinaryPath: wasm
      }
    : {
        wasmLoaderPath: wasmNosimdLoader,
        wasmBinaryPath: wasmNosimd
      };
}
