import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";

import { prisma } from "../../db/client";

export default async function slug(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    return res.json({
      message: "pls use with a slug",
    });
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    return res.json({
      message: "slug not found",
    });
  }
  return res.redirect(data.url);
}
