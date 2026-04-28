function zodErrorsToObject(issues: any[]) {
  const errors: Record<string, string[]> = {};

  issues.forEach((issue) => {
    const path = issue.path[0]; // field name

    if (!errors[path]) {
      errors[path] = [];
    }

    errors[path].push(issue.message);
  });

  return errors;
}

export default zodErrorsToObject;