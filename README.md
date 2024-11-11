# supersearch
Supersearch transforms native Spotlight search into a powerful tool, supporting all text-based file types on your computer and using content-aware indexing methods. We implemented BM25 just like MacOS, but index fully on all types of file content, helpful for situations where accuracy is more important than speed.

Supersearch is built with napi, Rust, Next.js, and Electron.

To run Supersearch locally:
`npm install`
`cd frontend && npm run dev`

We use hyperoptimized search with distributed sharding, multi-layer concurrency, virtual memory mappings, high-performant data structures, producer-consumer buffer reading, and more to achieve orders of magnitude faster index generation, index search, and smaller storage size. Take a look at the `indexer` directory for the code.
