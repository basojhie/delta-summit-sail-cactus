import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@react-three/fiber+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CgfA3IqR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OfficeApp = (0, import_react.lazy)(() => import("./OfficeApp-DA-hfDd4.mjs").then((mod) => ({ default: mod.OfficeApp })));
function Home() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "app-frame",
		children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeApp, {})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, {})
	});
}
function Boot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "boot",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tim kreatif" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Atrium" })]
	});
}
//#endregion
export { Home as component };
