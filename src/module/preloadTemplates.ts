export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = ['systems/rolemaster/templates/partials/stats.hbs'];

  return loadTemplates(templatePaths);
}
