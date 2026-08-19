import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";
import tanstackQuery from "@tanstack/eslint-plugin-query";

/**
 * Conditor lint configuration.
 *
 * Beyond catching bugs, this file is where the architecture stops being a
 * diagram and becomes something the build enforces. A layering rule that lives
 * only in a README is a rule that erodes on the first deadline.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tanstackQuery.configs["flat/recommended"],

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  /* ------------------------------------------------------------------ */
  /* TypeScript discipline                                              */
  /* ------------------------------------------------------------------ */
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // The brief is explicit: no `any`. An escape hatch stays available via
      // an inline disable, which forces the author to justify it in review.
      "@typescript-eslint/no-explicit-any": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // Keeps `import type` explicit, which lets the bundler drop type-only
      // imports instead of retaining a runtime module reference.
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // `console.log` left in production code is noise at best and a data leak
      // at worst. Warn/error remain available for genuine diagnostics.
      "no-console": ["warn", { allow: ["warn", "error"] }],

      eqeqeq: ["error", "always", { null: "ignore" }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  /* ------------------------------------------------------------------ */
  /* Import restrictions                                                */
  /* ------------------------------------------------------------------ */
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../*"],
              message:
                "Reach for the `@/` alias instead of climbing directories — deep relative paths break silently when a file moves.",
            },
          ],
          paths: [
            {
              name: "@/lib/supabase/admin",
              message:
                "The service-role client bypasses Row Level Security. Import it only inside Route Handlers, Server Actions or background jobs — never from a component.",
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* Architecture boundaries                                            */
  /*                                                                    */
  /* The dependency graph flows one way:                                */
  /*                                                                    */
  /*     app  →  features  →  shared                                    */
  /*                                                                    */
  /* Features may never import each other, and shared code may never    */
  /* import a feature. That single constraint is what keeps a feature   */
  /* deletable, testable in isolation, and safe to hand to another team.*/
  /* ------------------------------------------------------------------ */
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true, project: "./tsconfig.json" },
      },
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        {
          type: "feature",
          pattern: "src/features/*/**",
          capture: ["featureName"],
        },
        { type: "provider", pattern: "src/providers/**" },
        {
          type: "shared",
          pattern:
            "src/(components|hooks|lib|utils|constants|types|services|styles)/**",
        },
        { type: "root", pattern: "src/*" },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            // Routes compose everything — that is their entire job.
            {
              from: { element: { types: { anyOf: ["app", "root"] } } },
              allow: {
                to: {
                  element: {
                    types: {
                      anyOf: ["app", "root", "feature", "provider", "shared"],
                    },
                  },
                },
              },
            },
            {
              from: { element: { type: "provider" } },
              allow: {
                to: { element: { types: { anyOf: ["provider", "shared"] } } },
              },
            },
            {
              from: { element: { type: "feature" } },
              allow: { to: { element: { type: "shared" } } },
            },
            {
              // A feature may only reach into ITSELF: the captured folder name
              // on the target must equal the one on the importer. Cross-feature
              // imports are how modular codebases quietly become monoliths with
              // extra folders — shared needs belong in `shared`.
              from: { element: { type: "feature" } },
              allow: {
                to: {
                  element: {
                    type: "feature",
                    captured: {
                      featureName: "{{from.element.captured.featureName}}",
                    },
                  },
                },
              },
            },
            {
              from: { element: { type: "shared" } },
              allow: { to: { element: { type: "shared" } } },
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* Generated and vendored code                                        */
  /* ------------------------------------------------------------------ */
  {
    // shadcn/ui components are upstream code that gets re-pulled by the CLI.
    // Holding them to house style would mean re-editing them on every update.
    files: ["src/components/ui/**", "src/types/database.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "no-restricted-imports": "off",
      eqeqeq: "off",
    },
  },
]);

export default eslintConfig;
