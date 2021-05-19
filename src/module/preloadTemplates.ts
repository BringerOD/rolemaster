export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] =
    ['systems/rolemaster/templates/partials/stats.hbs',
      'systems/rolemaster/templates/partials/skills.hbs',
      'systems/rolemaster/templates/partials/languages.hbs',
      'systems/rolemaster/templates/partials/spells.hbs',
      'systems/rolemaster/templates/partials/general.hbs',

      'systems/rolemaster/templates/partials/movement.hbs'];

  return loadTemplates(templatePaths);
}
