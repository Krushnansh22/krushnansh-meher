import ragsmith from "./outputs/ragsmith-metrics.json";
import aetherCapsule from "./outputs/aether-capsule-response.json";
import foodbridge from "./outputs/foodbridge-cron.json";
import slmQuery from "./outputs/slm-query-response.json";
import uidai360 from "./outputs/uidai-360-dashboard.json";

export type OutputKind =
  | "text"
  | "json"
  | "metrics"
  | "image"
  | "iframe"
  | "links"
  | "typewriter";

export interface CodeOutput {
  kind: OutputKind;
  data: unknown;
}

export type Cell =
  | { id: string; type: "markdown"; content: string }
  | {
      id: string;
      type: "code";
      language: string;
      code: string;
      output: CodeOutput;
    };

/**
 * Ordered array of notebook cells. This is the single source of truth
 * for the entire page — adding a project means adding a cell object here,
 * no component code needs to change.
 */
export const notebook: Cell[] = [
  {
    id: "intro",
    type: "markdown",
    content: `# Krushnansh Meher

### Backend & ML Systems Engineer

\`\`\`python
>>> print(profile.summary())

"Builds retrieval systems, backend infrastructure,
and small on-device AI models that solve
real-world problems."
\`\`\`

## What I Build

I work on the infrastructure that powers AI products:

- Backend APIs
- Retrieval-Augmented Generation (RAG)
- ML inference pipelines
- On-device AI
- Data engineering & automation

## Tech Stack

\`Python\`
\`FastAPI\`
\`PyTorch\`
\`ONNX\`
\`PostgreSQL\`
\`LangChain\`
\`Docker\`

> **Currently**
>
> Open to Backend, AI Infrastructure and ML Systems internships / full-time opportunities.

Click **Run** on any cell below to explore a real project.`,
  },
  {
    id: "ragsmith",
    type: "code",
    language: "python",
    code: `from ragsmith.optimizer import GeneticChunker

config = GeneticChunker(
    population_size=60,
    generations=50,
    mutation_rate=0.08,
    fitness_fn="retrieval_at_k",
    k=6,
)

best_genome = config.evolve(corpus="./docs/knowledge_base")
print(best_genome.summary())`,
    output: { kind: "metrics", data: ragsmith },
  },
  {
    id: "aether-capsule",
    type: "code",
    language: "python",
    code: `from aether.router import CapsuleRouter

router = CapsuleRouter(region="ap-south-1")
router.register_routes(app.routes)

response = router.deploy(
    capsule="checkout-service",
    healthcheck="/healthz",
)
print(response.json())`,
    output: { kind: "json", data: aetherCapsule },
  },
  {
    id: "foodbridge",
    type: "code",
    language: "python",
    code: `from foodbridge.jobs import redistribute

@cron.schedule("0 2 * * *")
def nightly_redistribution():
    surplus = redistribute.scan_locations()
    matches = redistribute.match(surplus, receiving_shelters())
    routes = redistribute.optimize_routes(matches, vehicles=6)
    redistribute.notify_and_dispatch(routes)`,
    output: { kind: "text", data: foodbridge },
  },
  {
    id: "slm-inference",
    type: "code",
    language: "python",
    code: `from onnxruntime_genai import Model

model = Model("phi-3-mini-int4-onnx", device="npu")
query = "Summarize this week's expenses in one sentence."

response = model.generate(query, max_tokens=48, stream=True)
print(response)`,
    output: { kind: "typewriter", data: slmQuery },
  },
  {
    id: "uidai-360",
    type: "code",
    language: "python",
    code: `# Visualization trigger — renders an already-hosted,
# already-public dashboard. No live query happens from
# this page; it's a static <iframe> pointed at a share link.

show_dashboard(
    source="uidai-360",
    view="enrollment_trends",
)`,
    output: { kind: "iframe", data: uidai360 },
  },
  {
    id: "closing",
    type: "markdown",
    content: `---

### Get in touch

- **Email** — [krushnansh22@gmail.com](mailto:krushnansh22@gmail.com)
- **GitHub** — [github.com/krushnansh22](https://github.com/krushnansh22)
- **LinkedIn** — [linkedin.com/in/krushnansh_meher](https://www.linkedin.com/in/krushnansh-meher-71199a271/)
- **Resume** — [View PDF](https://drive.google.com/file/d/1h5QxLgZLAXmYXxefmBSLLdvQwwHNOzFK/view?usp=sharing)

\`\`\`
>>> # kernel idle. thanks for scrolling this far.
\`\`\``,
  },
];
