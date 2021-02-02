import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { BuildBuilderSchema } from './schema'
import { runGoCommand } from '../../utils/go-utils'

export function runBuilder(options: BuildBuilderSchema, context: BuilderContext): Observable<BuilderOutput> {
  return from(context.getProjectMetadata(context?.target?.project)).pipe(
    map((project) => {
      const sources = `./... -v`;
      return runGoCommand(context, 'test', [sources], { cwd: project.root })
    }),
  )
}

export default createBuilder(runBuilder)
