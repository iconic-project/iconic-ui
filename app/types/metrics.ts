/**
 * Commercial metrics aliases over generated RMS schemas.
 * No runtime list of metric keys.
 */

import type { components } from './api'

export type CommercialMetrics = components['schemas']['MetricsResource']
export type HotelKpis = components['schemas']['HotelKpisResource']
export type MetricWindow = CommercialMetrics['window']
export type MetricScope = CommercialMetrics['scope']
export type MetricDefinition = CommercialMetrics['metrics']['occupancy']['definition']
