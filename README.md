<p align="center">
<h1 align="center">relative-time</h1>
</p>

#### Supported Platforms
<img src="https://stefkors.com/api/platform/index.svg?os=web" />

Relative time formatting utility and auto-updating React component. Converts ISO date strings into human-readable relative timestamps like "5m ago", "yesterday", or "3 hours ago".

## Install

```bash
bun add @kors/relative-time
```

## Usage

### Utility function

```typescript
import { formatRelativeTime } from "@kors/relative-time"

formatRelativeTime("2025-06-15T12:00:00Z")          // "5m ago"
formatRelativeTime("2025-06-15T12:00:00Z", "long")   // "5 minutes ago"
```

### React component

```tsx
import { RelativeTime } from "@kors/relative-time"

function CommitRow({ date }: { date: string }) {
  return <RelativeTime date={date} style="short" className="text-muted" />
}
```

The component auto-updates on a smart interval: every 10s when under a minute old, every minute when under an hour, and every hour after that.

## API

### `formatRelativeTime(isoDate, style?)`

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `isoDate` | `string` | — | ISO 8601 date string |
| `style` | `"short" \| "long"` | `"short"` | Output format |

Returns a human-readable relative time string.

### `<RelativeTime />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `string` | — | ISO 8601 date string |
| `style` | `"short" \| "long"` | `"short"` | Output format |
| `className` | `string` | — | CSS class for the wrapping `<span>` |

## License

MIT
