import titlecase from 'titlecase';

export const langUtil = {
  getClassName(target: any) {
    if (target === null) {
      return 'Null';
    }

    return (
      target?.prototype?.constructor?.name ||
      target?.constructor?.name ||
      titlecase(typeof target)
    );
  },
};
