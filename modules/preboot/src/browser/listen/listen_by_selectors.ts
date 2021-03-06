import {App, AppState} from '../../interfaces/app';
import {ListenStrategy} from '../../interfaces/strategy';
import {NodeEvent} from '../../interfaces/event';

/**
 * This listen strategy uses a list of selectors maped to events. For example: 
 *    {
 *      'input[type="text"],textarea': ['focusin', 'focusout'],
 *      'button': ['click']
 *    }
 */
export function getNodeEvents(app: App, appState: AppState, strategy: ListenStrategy): NodeEvent[] {
  let nodeEvents = [];
  let eventsBySelector = strategy.eventsBySelector || {};
  let selectors = Object.keys(eventsBySelector);

  // loop through selectors
  for (let selector of selectors) {
    let events = eventsBySelector[selector];
    let elems = app.getAllAppNodes(appState, selector);

    // if no elems, go to next iteration in for loop
    if (!elems) { continue; }

    // for each node and eventName combo, add a nodeEvent
    for (let elem of elems) {
      for (let eventName of events) {
        nodeEvents.push({
          node: elem,
          eventName: eventName
        });
      }
    }
  }

  return nodeEvents;
}
