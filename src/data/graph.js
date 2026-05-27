export const contextGraphNodes = [
  { id: 'p1', type: 'context', position: { x: 320, y: 0 }, data: { label: 'Product Launch', category: 'project', status: 'active' } },
  { id: 'w1', type: 'context', position: { x: 120, y: 90 }, data: { label: 'Auth workflow', category: 'workflow', status: 'blocked' } },
  { id: 't1', type: 'context', position: { x: 520, y: 90 }, data: { label: 'Frontend API layer', category: 'task', status: 'active' } },
  { id: 't2', type: 'context', position: { x: 320, y: 180 }, data: { label: 'OAuth integration', category: 'task', status: 'pending' } },
  { id: 'f1', type: 'context', position: { x: 520, y: 200 }, data: { label: 'API spec v2.pdf', category: 'file' } },
  { id: 'd1', type: 'context', position: { x: 120, y: 220 }, data: { label: 'Beta ship date', category: 'deadline', status: 'at-risk' } },
  { id: 's1', type: 'context', position: { x: 0, y: 320 }, data: { label: 'Sprint planning', category: 'schedule' } },
  { id: 'h1', type: 'context', position: { x: 200, y: 340 }, data: { label: 'Morning deep work', category: 'habit' } },
  { id: 'pat1', type: 'context', position: { x: 400, y: 340 }, data: { label: 'Peak focus 9–12', category: 'pattern' } },
  { id: 'w2', type: 'context', position: { x: 600, y: 300 }, data: { label: 'CI/CD pipeline', category: 'workflow' } },
  { id: 't3', type: 'context', position: { x: 720, y: 180 }, data: { label: 'E2E test suite', category: 'task' } },
  { id: 'd2', type: 'context', position: { x: 640, y: 420 }, data: { label: 'Investor sync', category: 'deadline' } },
]

export const contextGraphEdges = [
  { id: 'e-w1-t2', source: 'w1', target: 't2', type: 'dependency', label: 'blocks', animated: true, data: { kind: 'blocks' } },
  { id: 'e-t2-t1', source: 't2', target: 't1', type: 'dependency', label: 'depends', animated: true, data: { kind: 'dependency' } },
  { id: 'e-p1-w1', source: 'p1', target: 'w1', data: { kind: 'relates' } },
  { id: 'e-p1-t1', source: 'p1', target: 't1', data: { kind: 'relates' } },
  { id: 'e-f1-t1', source: 'f1', target: 't1', data: { kind: 'relates' } },
  { id: 'e-t1-t3', source: 't1', target: 't3', type: 'dependency', animated: true, data: { kind: 'dependency' } },
  { id: 'e-d1-w1', source: 'd1', target: 'w1', data: { kind: 'relates' } },
  { id: 'e-h1-pat1', source: 'h1', target: 'pat1', data: { kind: 'relates' } },
  { id: 'e-pat1-t1', source: 'pat1', target: 't1', data: { kind: 'relates' } },
  { id: 'e-s1-w1', source: 's1', target: 'w1', data: { kind: 'relates' } },
  { id: 'e-w2-t3', source: 'w2', target: 't3', data: { kind: 'relates' } },
  { id: 'e-d2-p1', source: 'd2', target: 'p1', data: { kind: 'relates' } },
]

export const graphSummary = {
  nodes: 12,
  relationships: 12,
  blockedPaths: 1,
  activeDependencies: 3,
}
